import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//Import action
import {changeInput} from 'actions/common';

import {login} from 'actions/user.js';

class Login extends React.Component{

	constructor(props){
		super(props);

		this.handelOnSubmit = this.handelOnSubmit.bind(this);
	}

	handelOnSubmit(event){
        event.preventDefault();
        this.props.login(this.props.loginForm.username,this.props.loginForm.password);
    }

	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1>Login</h1>
					</div>
				</div>

				<div className="row">
					
					<form method="post" onSubmit={this.handelOnSubmit}>
						<div className="form-group">
							<label>Email Address</label>
							<input name="email" className="form-control" type="text" value={this.props.loginForm.username} onChange={(event) => this.props.updateValue(event.target.value,'username')} />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input name="password" className="form-control" type="password" value={this.props.loginForm.password} onChange={(event) => this.props.updateValue(event.target.value,'password')} />
						</div>
						<div className="form-group aligncenter mt-4">
							<button type="submit" className="btn btn-lg btn-warning">Log In</button>
						</div>
					</form>

				</div>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		user:state.currentUser,
		loginForm: state.login
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_LOGIN_INPUT',newVal,change)),
		login:(username,password) => dispatch(login(username,password))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);
