import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//Import action
import {changeInput} from 'actions/common';

import Holograms from 'components/holograms.js';


class Index extends React.Component{

	componentDidMount(){
		
	}

	render(){
		return(
			<div className="container">
				<div className="row mb-5 mt-5">
					<div className="col-12 text-center">
						<h1>Celebrity Holograms</h1>
					</div>
				</div>

				<Holograms  />
				
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {

	}
}


const mapDispatchToProps = dispatch => {
	return {

	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Index);
