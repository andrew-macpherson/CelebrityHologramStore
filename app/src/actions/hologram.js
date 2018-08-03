//Import Constants
import history from 'utils/history';
import api from 'utils/api.js';

//Import spinner
import {spinnerBegin,spinnerEnd} from 'actions/common.js';
//Import toastr
import {toastr} from 'react-redux-toastr';


export function resetHolograms() {
    console.log('reset');
    return {
        type: 'RESET_HOLOGRAM'
    };
}

export function setHolograms(holograms){
    return {
        type: 'SET_HOLOGRAMS',
        holograms: holograms
    };
}

export function setHologram(hologram){
    return {
        type: 'SET_HOLOGRAM',
        hologram: hologram
    };
}


export function getAll() {
    return (dispatch) => {

        dispatch(spinnerBegin());

		api.get('holograms',(success,err,data) => {
			if(success === true){
				dispatch(spinnerEnd());
                dispatch(setHolograms(data));
			}else{
                toastr.error('Error', 'There was an error: '+err);
		        dispatch(spinnerEnd());
			}
		});
    };
}

export function addEdit(hologram) {
    return (dispatch) => {

        dispatch(spinnerBegin());
        api.post('hologram',hologram,(success,err,data) => {
            if(success === true){
                dispatch(spinnerEnd());

                //refetch holograms
                dispatch(getAll());

                dispatch(resetHolograms());

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });
    };
}

export function deleteHologram(id) {
    return (dispatch) => {

        dispatch(spinnerBegin());
        api.delete('hologram',id,(success,err,data) => {
            if(success === true){
                dispatch(spinnerEnd());

                //refetch holograms
                dispatch(getAll());
                dispatch(resetHolograms());

            }else{
                toastr.error('Error', 'There was an error: '+err);
                dispatch(spinnerEnd());
            }
        });
    };
}

