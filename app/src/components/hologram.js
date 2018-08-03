import React from 'react';

export const Hologram = ({hologram}) => {
	return(
		<div>
			<h3>{hologram.firstName} {hologram.lastName}</h3>
			<p>${hologram.price}</p>
			<p>{hologram.description}</p>
		</div>
	)
}