import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Message } from "semantic-ui-react";
import React from 'react';
import * as api from '../../api';
import { AlbumList } from '../Album';
import { PhotoList } from '../Photo';
// import Login from '../Login';

class Main extends React.Component {
    state={
        albums:{},
        photos:{}
    }

    componentWillMount(){
        const localAlbums = localStorage.getItem('albums');
        const localPhotos= localStorage.getItem('photos');

        if(localAlbums && localPhotos){
            this.setState({
                albums: JSON.parse(localAlbums),
                photos: JSON.parse(localPhotos)
            });
        } else {
            this.setState({
                albums: api.getAlbums(),
                photos: api.getPhotos(),
            });
        }
    }
    componentWillUpdate(nextProps, nextState){
        localStorage.setItem(
            'photos',JSON.stringify(nextState.photos)
        );
    }

    createAlbum=(album) => {
        let albums={...this.state.albums};
        const timestamp=Date.now();
        albums[`albums-${timestamp}`]=album;
        this.setState({
            albums
        });
    }

    editAlbum =(key,updateAlbum) =>{
        let albums= { ...this.state.albums};
        albums[key]=updateAlbum;
        this.setState({
            albums
        });
    }

    deleteAlbum= (key) =>{
        let albums={...this.state.albums};
        delete albums[key];
        this.setState({
            albums
        });
    }

    createPhoto=(photo)=>{
        let photos={...this.state.photos};
        const timestamp= Date.now();
        photos[`photo-${timestamp}`]=photos;
        this.setState({
            photos
        });

    }

    editPhoto=(key,updatePhoto)=> {
        let photos={...this.state.photos};
        photos[key]=updatePhoto;
        this.setState({
            photos
        });
    }

    deletePhoto=(key)=>{
        let photos={...this.state.photos};
        delete photos[key];
        this.setState({
            photos
        });
    }
    
    render(){
        const{albums, photos}= this.state;
        
        const albumList= () => <AlbumList
                            albums={albums}
                            photos={photos}
                            deleteAlbum={this.deleteAlbum}
                            editAlbum={this.editAlbum}
                            createAlbum={this.createAlbum}
                            />;
        const photoList= () => <PhotoList
                            photos={photos}
                            deletePhoto={this.deletePhoto}
                            editPhoto={this.editPhoto}
                            createPhoto={this.createPhoto}
                            />;
        const error= ()  => <Message
                        icon='warning circle'
                        header='Ups..'
                        content='Please go back and try again'
                        />;
        return(
            <Router>

            <Switch>
                {/* <Route exact path="/" component={Login}/> */}
                <Route path="/albums" render={albumList}/>
                <Route path="/photos" render={photoList}/>
                {/* <Route path="/login" render={Login}/> */}
                <Route render={error}/>
            </Switch>
            </Router>
        )



    }
}

export default Main;