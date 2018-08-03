import * as constants from 'utils/constants';

var Cookies = require('js-cookie');


var api = {

	get(endpoint,callback){

		// Get User
		fetch(constants.API_BASE_URL+'/'+endpoint, {
			method: 'get'
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
		        callback(true,false,json);
		    });

		}).catch(function(error) {
	        callback(false,error);
	    });

		return;
	},

	post(endpoint,data,callback){

		// Get User
		fetch(constants.API_BASE_URL+'/'+endpoint, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	    	},
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
		        callback(true,false,json);
		    });

		}).catch(function(error) {
	        callback(false,error);
	    });

		return;
	},

	delete(endpoint, id,callback){
		
		// Register User
		fetch(constants.API_BASE_URL+'/'+endpoint+'/'+id, {
			method: 'delete'
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
		        callback(true,false,json);
		    });
			
		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });

		return;
	},


	login(data,callback){
		var access_token =  Cookies.get('access_token');

		// Get User
		fetch(constants.API_BASE_URL+'/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	    	},
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
				//Set the access token cookie
				Cookies.set('access_token', json.accessToken);
		        var access_token =  Cookies.get('access_token');

		        callback(true,false,json);
		    });

		}).catch(function(error) {
			console.log(error);
	        callback(false,error);
	    });

		return;
	},

	currentUser(callback){
		var access_token =  Cookies.get('access_token');

		var filters = {}

		fetch(constants.API_BASE_URL+'/me', {
			method: 'POST',
			body: JSON.stringify({accessToken:access_token}),
			headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	    	},
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
		    	 // After Fetch 
		        callback(true,false,json);
		    });
		}).catch(function(error) {
	        error.json().then(json => {
		        callback(false,json.error.message);
		    });
	    });
		return;
	},


}


export default api;
