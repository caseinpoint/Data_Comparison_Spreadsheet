import React from 'react';
import example from './example.png';

export default class Welcome extends React.Component {
	render() {
		return (
			<div className="text-center">
				<h1 className="display-3">Welcome to DCST</h1>
				<h1>Here's an example of what you can do with this tool:</h1>
				<img className="img-fluid border border-warning rounded" src={example} alt="example_image"/>
			</div>
		);
	}
}
