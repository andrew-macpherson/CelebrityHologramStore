import { combineReducers } from 'redux';

//Loading spinner
import {pendingTasksReducer} from 'react-redux-spinner';
//Toaster
import {reducer as toastrReducer} from 'react-redux-toastr';

//Dashboard Reducers
import {currentUser} from 'reducers/currentUser.js';
import {holograms} from 'reducers/holograms.js';
import {hologram} from 'reducers/hologram.js';

import {login} from 'reducers/login.js';

export default combineReducers({
  pendingTasks: pendingTasksReducer,
  toastr: toastrReducer,
  currentUser,
  holograms,
  hologram,
  login
})