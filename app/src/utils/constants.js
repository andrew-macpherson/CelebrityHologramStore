const APP_ENV = process.env.REACT_APP_ENV;

if(APP_ENV === 'development') {
    var URL          = 'http://localhost:3000';
    var API_BASE_URL = 'http://localhost:3001';
    var UPLOADS_URL = 'http://localhost:8888/test/app';
} else if(APP_ENV === 'production') {
    var URL          = 'http://localhost:3000';
    var API_BASE_URL = 'http://localhost:3001';
    var UPLOADS_URL = 'http://localhost:8888/test/app';
} else { // local
    var URL          = 'http://localhost:3000';
    var API_BASE_URL = 'http://localhost:3001';
    var UPLOADS_URL = 'http://localhost:8888/test/app';
}

export {URL};
export {API_BASE_URL};
export {UPLOADS_URL};

export const SITE_ROOT = process.env.PUBLIC_URL;