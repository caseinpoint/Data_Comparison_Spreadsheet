import React from 'react';

// this component will load saved sheets from Firebase and display links to them.
export default class ListTable extends React.Component {
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
