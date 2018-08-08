import React from 'react';
import {connect} from 'react-redux';
import Holograms from 'components/holograms.js';
import {Hologram} from 'components/hologram.js';


class Index extends React.Component{
	render(){
		return(
			<div className="container">
				<div className="row mb-5 mt-5">
					<div className="col-12 text-center">
						<h1>Celebrity Holograms</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-4">
						<Holograms hologram={this.props.hologram}  />
					</div>

					<div className="col-4">
						{this.props.hologram.id !== '' &&
							<Hologram hologram={this.props.hologram} />
						}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		hologram: state.hologram
	}
}


const mapDispatchToProps = dispatch => {
	return {

	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Index);