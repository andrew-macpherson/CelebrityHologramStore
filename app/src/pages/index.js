import React from 'react';
import Holograms from 'components/holograms.js';


export default class Index extends React.Component{
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