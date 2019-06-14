import React from 'react';
import Table from './components/Table';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newCol: '',
			columns: [{ id: 'col0avg', name: '[Average Score]', type: 1, sort: '▽' }],
			numRows: 0
		};
		this.handleColInputChange = this.handleColInputChange.bind(this);
		this.handleNewCol = this.handleNewCol.bind(this);
		this.handleDelCol = this.handleDelCol.bind(this);
		this.handleNewRow = this.handleNewRow.bind(this);
		this.handleDelRow = this.handleDelRow.bind(this);
	}

	handleColInputChange(event) {
		this.setState({ newCol: event.target.value });
	}

	handleNewCol(event) {
		let text = this.state.newCol.trim();
		if (text.length > 0) {
			let cols = this.state.columns.map(x => x);
			let avg = cols.pop(); // colAvg is always last
			let type = 't';
			if (event.target.name === '+') type = 1;
			else if (event.target.name === '-') type = -1;
			cols.push({ id: 'col' + cols.length, name: text, type: type, sort: '' });
			avg.id = 'col' + cols.length + 'avg';
			cols.push(avg);
			this.setState({ columns: cols, newCol: '' });
		}
	}

	handleDelCol() {
		if (this.state.columns.length > 1) {
			let cols = this.state.columns.map(x => x);
			let avg = cols.pop(); // colAvg is always last
			cols.pop();
			avg.id = 'col' + cols.length + 'avg';
			cols.push(avg);
			this.setState({ columns: cols });
		}
	}

	handleNewRow() {
		const num = this.state.numRows + 1;
		this.setState({ numRows: num });
	}

	handleDelRow() {
		if (this.state.numRows > 0) {
			const num = this.state.numRows - 1;
			this.setState({ numRows: num });
		}
	}

	render() {
		return (
			<div className="container">
				<h1 className="text-center">Data Comparison Spreadsheet Tool</h1>
				<div className="input-group mb-2">
					<input className="form-control" type="text" placeholder="New Column Name" value={this.state.newCol}
						onChange={this.handleColInputChange}/>
					<div className="input-group-append btn-group">
						<button className="btn btn-outline-success" name="t" onClick={this.handleNewCol}>Text</button>
						<button className="btn btn-outline-success" name="+" onClick={this.handleNewCol}>Number ▼</button>
						<button className="btn btn-outline-success" name="-" onClick={this.handleNewCol}>Number ▲</button>
					</div>
				</div>
				<Table key="table" columns={this.state.columns} numRows={this.state.numRows}/>
				<div className="btn-group mt-2 mr-2">
					<button className="btn btn-outline-success" onClick={this.handleNewRow}>Add New Row</button>
					<button className="btn btn-outline-danger" onClick={this.handleDelRow}>Delete Bottom Row</button>
				</div>
				<button className="btn btn-outline-danger mt-2" onClick={this.handleDelCol}>Delete Last Column</button>
				<label className="ml-4 mt-2">Double-click cells to edit.</label>
				<hr/>
				<p>The <span className="btn btn-sm btn-outline-success">Text</span> button creates a new text column.&emsp;
				The&nbsp;<span className="btn btn-sm btn-outline-success">Number ▼</span> button creates a number column that
				scores larger numbers higher.&emsp;The <span className="btn btn-sm btn-outline-success">Number ▲</span> button
				creates a number column that scores smaller numbers higher.&emsp;Scores are between 1 and 10, and are calculated
				by percent rank out of the entire column.&emsp;Click column headers to sort.&emsp;Sort by&nbsp;
				<span className="text-primary">[Average Score]</span> descending to see the rows in order of best overall.</p>
			</div>
		);
	}
}
