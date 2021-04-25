import React from 'react';
import PropTypes from 'prop-types';
import {Card, Label, Button} from 'semantic-ui-react';

const Photo=(props)=>{

    const{photo}=props;

    const renderTags = ()=> {
        return(
            photo.tags
            .map((tagName,index) => {
                return<Label key={index}>{tagName}</Label>
            })
        );
    }

    return (
        <Card>
            <Card.Content className='header'>
                <Card.Header>
                    {photo.name}
                </Card.Header>
                <Label attached='top right'>
                </Label>
            </Card.Content>
           
            <Card.Content>
                <Card.Descripsion as='p'>
                    {photo.description}
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

Photo.PropTypes={
    photo: PropTypes.object.isRequired,
    
}


export default Photo;