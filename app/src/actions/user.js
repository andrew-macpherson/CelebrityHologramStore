//Import Constants
import history from 'utils/history';
import api from 'utils/api.js';

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

        var data = {
            username:username,
            password:password
        }

		api.login(data,(success,err,data) => {
			if(success === true){
                dispatch(setUser(data.user));

                history.push('/dashboard');

			}else{

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