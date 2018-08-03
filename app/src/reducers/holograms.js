const initState = []

// Handle changing application state
export const holograms = (state = initState,action) => {
	switch(action.type){
		case "SET_HOLOGRAMS":
			const newState = action.holograms;
			return newState;

		case "RESET_HOLOGRAMS":
			let resetState = []
			return resetState;

		default:
			return state;
	}
}
