import React from 'react';
import * as constants from 'utils/constants';

export const Hologram = ({hologram}) => {
	return(
		<div className="card" >
			<img src={constants.UPLOADS_URL+'/uploads/thumbs/'+hologram.image} />
			<div className="card-body">
				<h5 className="card-title">{hologram.firstName} {hologram.lastName}</h5>
				<p className="card-text">{hologram.description}</p>
				<p>${hologram.price}</p>
				<a href="#" className="btn btn-primary" onClick={(event) => alert('You now own this hologram')}>Purchase</a>
			</div>
		</div>
	)
}