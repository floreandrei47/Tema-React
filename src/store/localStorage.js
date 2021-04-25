import * as api from '../api';

export const loadState = () =>{

    const localAlbums = localStorage.getItem('albums');
    

    if(localAlbums){
        return{
            albums: JSON.parse(localAlbums)
        }
    }
    return{
        albums: api.getAlbums()
    }
};

export const saveState=(itemName, state) => {
    localStorage.setItem(
        itemNamem, JSON.stringify(state)
    );
};