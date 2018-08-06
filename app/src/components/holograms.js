import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//Import action
import {changeInput} from 'actions/common';
import {getAll,setHologram} from 'actions/hologram.js';

import {Hologram} from 'components/hologram.js';
import {HologramButton} from 'components/hologramButton.js';


class Holograms extends React.Component{

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
			<div className="row">
				<div className="col-4">
					<ul class="list-group">
						{this.props.holograms.map(function(hologram,index){
						return (
							<HologramButton key={index} hologram={hologram} handleOnClick={this.selectHologram} active={(this.props.hologram !== undefined && this.props.hologram.id === hologram.id ? true : false )} />
							)
						},this)}
					</ul>
				</div>

				<div className="col-8">
					{this.props.hologram.id !== '' &&
						<Hologram hologram={this.props.hologram} />
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		holograms: state.holograms,
		hologram: state.hologram
	}
}


const mapDispatchToProps = dispatch => {
	return {
		getAll: () => dispatch(getAll()),
		setHologram: (hologram) => dispatch(setHologram(hologram))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Holograms);
