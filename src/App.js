import React from 'react';
import 'react-router';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import TableContainer from './components/TableContainer';

export default class App extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	//
	// 	};
	// }

	render() {
		return (
			<BrowserRouter>
				<div className="container-fluid">
					<div className="row px-5">
						<div className="col-8">
							<h1>Data Comparison Spreadsheet Tool</h1>
						</div>
						<div className="col-4">
							<Link to="/new" className="btn btn-primary">New</Link>
						</div>
					</div>
					<Route path="/new" component={TableContainer}/>
				</div>
			</BrowserRouter>
		);
	}
}
