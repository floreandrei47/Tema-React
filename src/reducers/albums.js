import * as actionTypes from '../actions/actionTypes';

export default (state = {}, actions) => {

    switch (actiontype) {

        case actionTypes.DELETE_ALBUM:{
            let {[action.key]:albumDeleted,...restOfAlbums}=state;
            return restOfAlbums;
        }
        default:
            return state;
    }
}