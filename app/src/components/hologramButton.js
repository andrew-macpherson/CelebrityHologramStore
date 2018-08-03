import React from 'react';

export class HologramButton extends React.Component{

	handleOnClick(event){
		event.preventDefault();
		this.props.handleOnClick(this.props.hologram);
	}

	render(){
		return(
			<button onClick={(event) => this.handleOnClick(event)}>{this.props.hologram.firstName} {this.props.hologram.lastName}</button>
		)
	}
}
/*
export const HologramButton = ({hologram,handleOnClick}) => {
	return(
		<button onClick={(event,hologram) => handleOnClick()}>{hologram.firstName} {hologram.lastName}</button>
	)
}
*/