import React from 'react';

export default class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			score: props.score,
			// editing: true,
			editing: false,
		};
		// if (props.colId.endsWith('avg')) this.state.editing = false;
		this.handleDblClick = this.handleDblClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.score !== state.score) return { score: props.score };
		else return null;
	}

	handleDblClick() {
		if (!this.props.colId.endsWith('avg')) {
			this.setState({ editing: true });
		}
	}

	handleInputChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		let value = this.state.value;
		if (this.props.type !== 't') value = parseFloat(value);
		this.setState({ editing: false, value: value });
		this.props.updateCell(this.props.rowId, this.props.colId, value);
	}

	render() {
		if (this.state.editing) {
			return (
				<td>
					<form onSubmit={this.handleSubmit}>
						<input className="form-control" type="text" value={this.state.value}
							onChange={this.handleInputChange} autoFocus/>
					</form>
				</td>
			);
		} else {
			if (!this.props.colId.endsWith('avg')) {
				if (this.props.type === 't') {
					return (
						<td onDoubleClick={this.handleDblClick}>
							<p>{this.state.value}</p>
						</td>
					);
				} else {
					return (
						<td onDoubleClick={this.handleDblClick}>
							<div className="row">
								<div className="col-md-6 col-sm-12">{this.state.value}</div>
								<div className="col-md-6 col-sm-12 text-primary">{this.state.score.toFixed(2)}</div>
							</div>
						</td>
					);
				}
			} else {
				return (
					<td>
						<p className="text-primary"><strong>{this.state.score.toFixed(3)}</strong></p>
					</td>
				);
			}
		}
	}
}
