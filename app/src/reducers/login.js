const initState = {
	email: '',
	password:''
}


export function login(state = initState, action){
	switch(action.type){
		case "CHANGE_LOGIN_INPUT":
			const newInputState = {
				...state,
				[action.item_to_change]: action.new_value
			}
			
			return newInputState;

		case "RESET_LOGIN_FORM":
			let resetFormState = {
				email: '',
				password:''
			};

			return resetFormState;

		default: 
			return state;
	}
}