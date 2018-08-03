const initState = {
	id: '',
	firstName: '',
	lastName: '',
	image: '',
	description: '',
	price: ''
}

// Handle changing application state
export const hologram = (state = initState,action) => {
	switch(action.type){
		case "CHANGE_HOLOGRAM_INPUT":
			const newInputState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			
			return newInputState;
		case "SET_HOLOGRAM":
			const newState = Object.assign({},state,action.hologram);
			console.log(newState);
			return newState;

		case "RESET_HOLOGRAM":
			let resetState = initState
			return resetState;

		default:
			return state;
	}
}