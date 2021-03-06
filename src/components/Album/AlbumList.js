import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Album, {AlbumForm} from '../Album';
import StatusBar from '../StatusBar';
import { WithLightbox, DeleteButton} from '../Common';

const AlbumList=(props)=> {
    const {albums,photos,createAlbum, editAlbum}=props;

    const getAlbumPhotos= (album) => {
        return album.photosIds
        .filter(id => photos[id])
        .map(id => {
            return photos[id];
        });
    }

    const renderAlbums = () => {
        return(
            Object.keys(albums)
            .map(key => {
                const album= albums[key];
                const albumPhotos= getAlbumPhotos(album);

                return(
                    <Album
                    key={key}
                    album={album}
                    albumPhotos={albumPhotos}
                    >
                        <Button icon>
                            <WithLightbox
                            photos={albumPhotos}
                            >
                                <Icon name='play'/>
                            </WithLightbox>

                        </Button>
                        <AlbumForm
                         formType='Edit'
                         index={key}
                         album={album}
                         photos={photos}
                         editAlbum={editAlbum}
                         />
                         <DeleteButton
                         index={key}
                         objectName={album.name}
                         deleteObject={deleteAlbum}
                         />
                    </Album>

                );
            })
        );
    }

    return(
        <div>
        <StatusBar title={`${Object.keys(albums).lenght}Album(s) total`}>
          <AlbumForm
            formType='New'
            photos={photos}
            createAlbum={createAlbum}
            />  
        </StatusBar>
        <Card.Group itemsPerRow={4} doubling>
            {renderAlbums}
        </Card.Group>
        </div>
    );
}

AlbumList.propTypes={
    albums: PropTypes.object.isRequired,
    photos: PropTypes.object.isRequired,
    createAlbum: PropTypes.func.isRequired,
    editAlbum: PropTypes.func.isRequired,

};

const mapStateToProps =(state) => {
    return{
        albums:state.album,
    }
}

function mapDispatchToProps(dispach){
    return{
        deleteAlbum:key => dispach(albumActions.deleteAlbum(key)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AlbumList);