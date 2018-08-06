//Import Constants
import history from 'utils/history';
import api from 'utils/api.js';


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

		api.get('holograms',(success,err,data) => {
			if(success === true){
                dispatch(setHolograms(data));
			}else{

			}
		});
    };
}

export function addEdit(hologram) {
    return (dispatch) => {
        api.post('hologram',hologram,(success,err,data) => {
            if(success === true){

                //refetch holograms
                dispatch(getAll());

                dispatch(resetHolograms());

            }else{

            }
        });
    };
}

export function deleteHologram(id) {
    return (dispatch) => {

        api.delete('hologram',id,(success,err,data) => {
            if(success === true){
                //refetch holograms
                dispatch(getAll());
                dispatch(resetHolograms());

            }else{

            }
        });
    };
}

