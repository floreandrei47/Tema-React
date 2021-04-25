import {createStore} from 'redux';
import rootReducer from '../reduceres';
import {loadState, saveState} from './localStore';

 const configureStore = () =>{

    const persistedState=loadState();

    const store = createStore(
        rootReducer,
        persistedState
    );

    store.subscribe(()=>{
        const {albums, photos} = store.getState();
        saveState('albums',albums);
        
    });

    return store;

 }

 export default configureStore;