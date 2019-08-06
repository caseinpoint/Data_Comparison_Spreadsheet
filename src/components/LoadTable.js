import React from 'react';

export default class LoadTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		if (localStorage.getItem('DCSTid') === null) {
			this.props.history.push('/login');
		}
	}

	render() {
		return (
			<div>saved sheets</div>
		);
	}
}
