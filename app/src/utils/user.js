import * as constants from 'utils/constants';

var Cookies = require('js-cookie');

var user = {
	loggedIn(username, password, callback){
		var access_token =  Cookies.get('access_token');
		if(access_token !== '' && access_token !== undefined){
			return true;
		}else{
			return false;
		}
	}
}


export default user;
