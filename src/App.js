import React from 'react';
import 'react-router';
import {BrowserRouter, Route, Link} from 'react-router-dom'; // , Redirect
import Welcome from './components/Welcome';
import TableContainer from './components/TableContainer';

export default class App extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	//
	// 	};
	// }

	render() {
		// <Link to="/load" className="btn btn-secondary"><strong>Load</strong></Link>
		return (
			<BrowserRouter>
				<div className="container-fluid">
					<div className="row px-3 mb-2 border-bottom border-primary">
						<div className="col-lg-8 col-md-12 pt-1">
							<h2 className="text-primary">Data Comparison Spreadsheet Tool</h2>
						</div>
						<div className="col-lg-4 col-md-12 pt-lg-2 pb-md-2">
							<div className="btn-group">
								<Link to="/" className="btn btn-primary"><strong>Home</strong></Link>
								<Link to="/new" className="btn btn-success"><strong>New</strong></Link>
							</div>
						</div>
					</div>
					<Route exact path="/" component={Welcome}/>
					<Route path="/new" component={TableContainer}/>
				</div>
			</BrowserRouter>
		);
	}
}
