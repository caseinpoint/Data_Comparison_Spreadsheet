import React from 'react';
import Cell from './Cell';
import './Table.css';

export default class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: props.columns,
			colAvg: 'col0avg',
			numRows: props.numRows,
			rows: []
		};
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.updateCell = this.updateCell.bind(this);
		this.setColumnSort = this.setColumnSort.bind(this);
		this.sortRows = this.sortRows.bind(this);
		this.updateScores = this.updateScores.bind(this);
		this.updateAllScores = this.updateAllScores.bind(this);
		this.updateAverages = this.updateAverages.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.columns.length !== state.columns.length) return { columns: props.columns };
		else if (props.numRows !== state.numRows) return { numRows: props.numRows };
		else return null;
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.numRows < prevProps.numRows) {
			// delete last row
			let rows = this.state.rows.map(r => r);
			rows.pop();
			this.setState({ rows: rows });
		} else if (this.props.numRows > prevProps.numRows) {
			// add new row
			let rows = this.state.rows.map(r => r);
			let newRow = { id: 'row' + rows.length };
			for (let col of this.state.columns) {
				newRow[col.id] = { type: col.type };
				if (col.type === 't') newRow[col.id]['value'] = col.name;
				else {
					newRow[col.id]['value'] = 0;
					newRow[col.id]['score'] = 0;
				}
			}
			rows.push(newRow);
			this.setState({ rows: rows });
		}
		if (this.state.rows.length < prevState.rows.length && this.state.rows.length > 0) {
			this.updateAllScores(); // update all scores when a row is deleted
		}

		if (this.props.columns.length !== prevProps.columns.length && this.props.numRows === 0) {
			// no rows, so just track new average column id
			this.setState({ colAvg: this.props.columns[this.props.columns.length - 1].id});
		}
		else if (this.props.columns.length > prevProps.columns.length && this.props.numRows > 0) {
			// add new column to all rows and update average key
			const oldAvg = this.state.colAvg;
			const newAvg = this.props.columns[this.props.columns.length - 1].id;
			const col = this.props.columns[this.props.columns.length - 2];
			const rows = this.state.rows.map((row) => {
				row[col.id] = { type: col.type };
				if (col.type === 't') row[col.id]['value'] = col.name;
				else {
					row[col.id]['value'] = 0;
					row[col.id]['score'] = 0;
				}
				row[newAvg] = row[oldAvg];
				delete row[oldAvg];
				return row;
			});
			this.setState({ rows: rows, colAvg: newAvg });
		} else if (this.props.columns.length < prevProps.columns.length && this.props.numRows > 0) {
			// delete old column from all rows and update average key
			const col = prevProps.columns[prevProps.columns.length - 2].id;
			const oldAvg = this.state.colAvg;
			const newAvg = this.props.columns[this.props.columns.length - 1].id;
			const rows = this.state.rows.map((row) => {
				delete row[col];
				row[newAvg] = row[oldAvg];
				delete row[oldAvg];
				return row;
			});
			this.setState({ rows: rows, colAvg: newAvg });
			this.updateAverages();
		}
	}

	setColumnSort(event) {
		const columns = this.state.columns.map((column) => {
			if (column.id !== event.target.id) column.sort = '';
			else {
				if (column.sort === '▽') column.sort = '△';
				else column.sort = '▽';
			}
			return column;
		});
		this.setState({ columns: columns });
		this.sortRows(event.target.id);
	}

	sortRows(colId) {
		if (this.state.rows.length < 2) return; // no need to sort 0 or 1 row
		const sortCol = this.state.columns.find((col) => { return col.id === colId; });
		let rows = this.state.rows.map(r => r);
		let sortBy = 'score';
		if (sortCol.type === 't') sortBy = 'value'
		if (sortCol.sort === '▽') {
			rows.sort((a,b) => (a[sortCol.id][sortBy] < b[sortCol.id][sortBy]) ? 1 : -1);
		} else {
			rows.sort((a,b) => (a[sortCol.id][sortBy] > b[sortCol.id][sortBy]) ? 1 : -1);
		}
		this.setState({ rows: rows });
	}

	/* update value with state passed up by Cell */
	updateCell(rowId, colId, value) {
		let rows = this.state.rows.map((row) => {
			if (row.id === rowId) {
				row[colId].value = value;
			}
			return row;
		});
		this.setState({ rows: rows });
		this.updateScores(colId);
		this.updateAverages();
	}

	/* based on PERCENTRANK from Excel */
	static percentRankScore(arr, num) {
		let smaller = 0;
		let larger = 0;
		for (let n of arr) {
			if (n < num) smaller++;
			else if (n > num) larger++;
		}
		if (smaller === 0 && larger === 0) return 5.5;
		else return smaller / (smaller + larger) * 9 + 1;
	}

	updateAllScores() {
		for (let column of this.state.columns) {
			if(column.type !== 't' && !column.id.endsWith('avg')) this.updateScores(column.id);
		}
		this.updateAverages();
	}

	updateScores(colId) {
		const updateCol = this.state.columns.find((col) => { return col.id === colId; });
		if (updateCol.type === 't') return; // text type doesn't need to calculate scores
		let rows = this.state.rows.map(r => r);
		let values = [];
		for (let row of rows) values.push(row[updateCol.id].value * updateCol.type); // updateCol.type = 1 or -1
		for (let row of rows) row[updateCol.id].score = Table.percentRankScore(values, row[updateCol.id].value * updateCol.type);
		this.setState({ rows: rows });
	}

	static arrayAverage(arr) {
		if (arr.length === 0) return 0;
		let sum = 0;
		for (let n of arr) sum += n;
		return sum / arr.length;
	}

	updateAverages() {
		const rows = this.state.rows.map((row) => {
			let scores = [];
			let avg;
			for (let key in row) {
				if (key !== 'id' && !key.endsWith('avg') && row[key].type !== 't') scores.push(row[key].score);
				else if (key.endsWith('avg')) avg = key;
			}
			row[avg].score = Table.arrayAverage(scores);
			return row;
		});
		this.setState({ rows: rows });
	}

	render() {
		const headers = this.state.columns.map((col) => {
			if (!col.id.endsWith('avg')) {
				let score = '';
				if (col.type !== 't') score = <span className="text-primary" id={col.id}>&ensp;(score)</span>;
				return <th key={col.id} id={col.id} onClick={this.setColumnSort}>{col.name}{score}&ensp;{col.sort}</th>;
			} else {
				return (
					<th className="text-primary" key={col.id} id={col.id} onClick={this.setColumnSort}>{col.name}&ensp;{col.sort}</th>
				);
			}
		});

		let rowNum = 1;
		const body = this.state.rows.map((row) => {
			let cells = [];
			cells.push(<td key={'rowNum'+rowNum} className="text-black-50">{rowNum}</td>);
			for (let key in row) {
				if (key !== 'id') {
					cells.push(
						<Cell key={row.id + key} rowId={row.id} colId={key} type={row[key].type} value={row[key].value}
							score={row[key].score} updateCell={this.updateCell}/>
					);
				}
			}
			rowNum++;
			return (
				<tr key={row.id}>
					{cells}
				</tr>
			);
		});

		return (
			<div className="table-responsive border table_box">
				<table className="table table-bordered table-hover">
					<thead className="thead-light">
						<tr>
							<th className="text-black-50">[row]</th>
							{headers}
						</tr>
					</thead>
					<tbody>
						{body}
					</tbody>
				</table>
			</div>
		);
	}
}
