import React from 'react';

export class HologramButton extends React.Component{

	handleOnClick(event){
		event.preventDefault();
		this.props.handleOnClick(this.props.hologram);
	}

	render(){
		return(
			<button class={"list-group-item list-group-item-action "+ (this.props.active ? "active":"")} onClick={(event) => this.handleOnClick(event)}>{this.props.hologram.firstName} {this.props.hologram.lastName}</button>
		)
	}
}