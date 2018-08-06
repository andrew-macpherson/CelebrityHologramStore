import { combineReducers } from 'redux';

//Dashboard Reducers
import {currentUser} from 'reducers/currentUser.js';
import {holograms} from 'reducers/holograms.js';
import {hologram} from 'reducers/hologram.js';

import {login} from 'reducers/login.js';

export default combineReducers({
  currentUser,
  holograms,
  hologram,
  login
})