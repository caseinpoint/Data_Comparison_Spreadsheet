import React from 'react';

export default class LogReg extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			logEmail: '',
			logPass: '',
			logErr: '',
			regEmail: '',
			regEmailErr: '',
			regPass: '',
			regPassErr: '',
			regConfirm: '',
			regConfirmErr: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleInputChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleLogin(event) {
		event.preventDefault();
		console.log(event);
	}

	handleRegister(event) {
		event.preventDefault();
		console.log(event);
	}

	render() {
		return (
			<div className="row">
				<div className="col-lg-6 col-md-12 pt-2 pb-4 border">
					<h3>Login</h3>
					<p className="text-danger">{this.state.logErr}</p>
					<form onSubmit={this.handleLogin}>
						<div className="form-group">
							<label>Email:</label>
							<input className="form-control" type="email" value={this.state.logEmail} name="logEmail" onChange={this.handleInputChange} />
						</div>
						<div className="form-group">
							<label>Password:</label>
							<input className="form-control" type="password" value={this.state.logPass} name="logPass" onChange={this.handleInputChange} />
						</div>
						<button type="submit" className="btn btn-primary">Login</button>
					</form>
				</div>
				<div className="col-lg-6 col-md-12 py-2 border">
					<h3>Create an Account</h3>
					<form onSubmit={this.handleRegister}>
						<div className="form-group">
							<label>Email:</label>
							<label className="text-danger">{this.state.regEmailErr}</label>
							<input className="form-control" type="email" value={this.state.regEmail} name="regEmail" onChange={this.handleInputChange} />
						</div>
						<div className="form-group">
							<label>Password:</label>
							<label className="text-danger">{this.state.regPassErr}</label>
							<input className="form-control" type="password" value={this.state.regPass} name="regPass" onChange={this.handleInputChange} />
						</div>
						<div className="form-group">
							<label>Confirm Password:</label>
							<label className="text-danger">{this.state.regConfirmErr}</label>
							<input className="form-control" type="password" value={this.state.regConfirm} name="regConfirm" onChange={this.handleInputChange} />
						</div>
						<button type="submit" className="btn btn-success">Register</button>
					</form>
				</div>
			</div>
		);
	}
}
