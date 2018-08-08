import React from 'react';
import {connect} from 'react-redux';

//Import action
import {getAll,setHologram} from 'actions/hologram.js';

import {HologramButton} from 'components/hologramButton.js';


class HologramList extends React.Component{

	componentDidMount(){
		this.props.getAll();

		this.selectHologram = this.selectHologram.bind(this);
	}

	selectHologram(hologram){
		//event.preventDefault();
		console.log(hologram);
		this.props.setHologram(hologram);
	}

	render(){
		return(
			<ul className="list-group">
				{this.props.holograms.map(function(hologram,index){
				return (
					<HologramButton key={index} hologram={hologram} handleOnClick={this.selectHologram} active={(this.props.hologram !== undefined && this.props.hologram.id === hologram.id ? true : false )} />
					)
				},this)}
			</ul>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		holograms: state.holograms
	}
}


const mapDispatchToProps = dispatch => {
	return {
		getAll: () => dispatch(getAll()),
		setHologram: (hologram) => dispatch(setHologram(hologram))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(HologramList);
