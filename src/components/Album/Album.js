import React from 'react';
import PropTypes from 'prop-types';
import {Card, Icon, Image, Label, Button} from 'semantic-ui-react';
import './Album.css';

const Album=(props)=>{

    const {album, albumPhotos}=props;

    const renderPreviewImages=()=>{
        return(
            albumPhotos
            .filter((photo,index) => photo && index <4)
            .map((photo, index)=>{
                return <Image key={index} src={photo.url}/>;

            })
        );
    }

    const renderTags = ()=> {
        return(
            album.tags
            .map((tagName,index) => {
                return<Label key={index}>{tagName}</Label>
            })
        );
    }

    return (
        <Card>
            <Card.Content className='header'>
                <Card.Header>
                    {album.name}
                </Card.Header>
                <Label attached='top right'>
                   <Icon name='photo'/>
                   {albumPhotos.lenght}   
                </Label>
            </Card.Content>
            <Card.Content className="photo-container">
                <Image.Group size='tiny'>
                    {renderPreviewImages()}
                </Image.Group>
            </Card.Content>
            <Card.Content>
                <Card.Descripsion as='p'>
                    {album.description}
                </Card.Descripsion>
            
            <Card.Meta>
                <Label.Group tag size='mini'>
                    {renderTags()}
                </Label.Group>
            </Card.Meta>
            </Card.Content>
            <Button.Group basic attached="bottom">
                {props.children}
            </Button.Group>
        </Card>
    );
}

    Album.PropTypes={
        album: PropTypes.object.isRequired,
        albumPhotos:PropTypes.array.isRequired,
    }


export default Album;
