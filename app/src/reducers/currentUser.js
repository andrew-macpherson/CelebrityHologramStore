const initState = {
	accessToken: '',
	id: '',
	username: ''
}


// Handle changing application state
export const currentUser = (state = initState,action) => {
	switch(action.type){
		case "SET_USER_STATE":
			const newState = Object.assign({},state, action.user);
			return newState;

		case "CHANGE_USER_INPUT":
			const newInputState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			return newInputState;

		case "RESET_USER_STATE":
			let resetUserState = {
				...initState
			}
			return resetUserState;


		default:
			return state;
	}
}
