//Import Constants
import history from 'utils/history';
import api from 'utils/api.js';

//Import spinner
import {spinnerBegin,spinnerEnd} from 'actions/common.js';
//Import toastr
import {toastr} from 'react-redux-toastr';

var Cookies = require('js-cookie');

export function resetUser() {
    return {
        type: 'RESET_USER_STATE'
    };
}

export function setUser(user){
    return {
        type: 'SET_USER_STATE',
        user: user
    };
}


export function login(username,password) {
    return (dispatch) => {

        dispatch(spinnerBegin());

        var data = {
            username:username,
            password:password
        }

        console.log(data);

		api.login(data,(success,err,data) => {
			if(success === true){
				dispatch(spinnerEnd());
                dispatch(setUser(data.user));

                history.push('/dashboard');

			}else{
                toastr.error('Error', 'There was an error: '+err);
		        dispatch(spinnerEnd());
			}
		});
    };
}

export function logOut(){
    return (dispatch) => {
        //console.log('logging user out');

        Cookies.remove('access_token');
        dispatch(resetUser({}));
        //Send user to home
        history.push('/');

    }
}