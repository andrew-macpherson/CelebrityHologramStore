import * as constants from 'utils/constants';

import {API_BASE_URL} from 'utils/constants';


import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import history from 'utils/history';

//Import Utils
import user from 'utils/user.js';
import api from 'utils/api.js';

//Import action
import {changeInput} from 'actions/common';
import {setUser,logOut} from 'actions/user';
import {resetHolograms,addEdit,deleteHologram} from 'actions/hologram';

import Holograms from 'components/holograms.js';


class Index extends React.Component{

	constructor(props){
		super(props);

		this.clearHologram = this.clearHologram.bind(this);
		this.handelOnSubmit = this.handelOnSubmit.bind(this);
		this.deleteHologram = this.deleteHologram.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	componentDidMount(){
		//check if logged in i.e. the access token is set.
		if(user.loggedIn()){
			// Check if the current user state is empty.
			if(this.props.currentUser.id === ''){
				//Get current user data
				api.currentUser((success,error,user) => {
					// Set the current user state
					this.props.setUser(user[0]);
				});
			}


		}else{
			//User is not logged in, lets send them to login page.
			history.push('/login');
		}
	}

	handelOnSubmit(event){
		event.preventDefault();

		// If we have a hologram ID update otherwise add 
		this.props.addEdit(this.props.hologram);
	}

	clearHologram(event){
		event.preventDefault();	
		this.props.resetHolograms();
	}

	deleteHologram(event){
		event.preventDefault();	
		this.props.deleteHologram(this.props.hologram.id);
	}

	logOut(){
		this.props.logOut();
	}

	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Dashboard</h1>
						<p>Welcome back {this.props.currentUser.username}!</p>
						<button onClick={(event)=> this.logOut(event)}>Log Out</button>
					</div>
				</div>

				<Holograms  />

				<div className="row">
					<div className="col-3">
						<h4>Add / edit Hologram</h4>
						
						<form method="post" onSubmit={this.handelOnSubmit}>
							<div className="form-group">
								<label>First Name</label>
								<input name="email" className="form-control" type="text" value={this.props.hologram.firstName} onChange={(event) => this.props.updateValue(event.target.value,'firstName')} />
							</div>
							<div className="form-group">
								<label>Last Name</label>
								<input name="password" className="form-control" type="text" value={this.props.hologram.lastName} onChange={(event) => this.props.updateValue(event.target.value,'lastName')} />
							</div>
							<div className="form-group">
								<label>Description</label>
								<input name="password" className="form-control" type="text" value={this.props.hologram.description} onChange={(event) => this.props.updateValue(event.target.value,'description')} />
							</div>
							<div className="form-group">
								<label>Price</label>
								<input name="password" className="form-control" type="text" value={this.props.hologram.price} onChange={(event) => this.props.updateValue(event.target.value,'price')} />
							</div>
							<div className="form-group aligncenter mt-4">
								<button type="submit" className="btn btn-lg btn-warning">Add / Edit</button>
								<button type="button" className="btn btn-lg btn-warning" onClick={(event) => this.clearHologram(event)}>Clear</button>
								<button type="button" className="btn btn-lg btn-danger" onClick={(event) => this.deleteHologram(event)}>Delete</button>
							</div>
						</form>

					</div>
				</div>

			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		currentUser: state.currentUser,
		holograms: state.holograms,
		hologram: state.hologram
	}
}


const mapDispatchToProps = dispatch => {
	return {
		updateValue: (newVal,change) => dispatch(changeInput('CHANGE_HOLOGRAM_INPUT',newVal,change)),
		setUser:(user) => dispatch(setUser(user)),
		addEdit:(hologram) => dispatch(addEdit(hologram)),
		resetHolograms:() => dispatch(resetHolograms()),
		deleteHologram:(id) => dispatch(deleteHologram(id)),
		logOut: () => dispatch(logOut())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Index);
