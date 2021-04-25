import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import Photo, { PhotoForm } from "../Photo";
import StatusBar from "../StatusBar";
import { WithLightbox, DeleteButton } from "../Common";

const PhotoList = (props) => {
  const { photos, deletePhoto, editPhoto, createPhoto } = props;

  const getAlbumPhotos = (photo) => {
    return photo.Id.filter((id) => photos[id]).map((id) => {
      return photos[id];
    });
  };

  const renderPhotos = () => {
    return Object.keys(photos).map((key) => {
      const photo = photos[key];
      const albumPhotos = getAlbumPhotos(photo);

      return (
        <Photo key={key} photo={photo} albumPhotos={albumPhotos}>
          <Button icon>
            <WithLightbox photos={albumPhotos}>
              <Icon name="play" />
            </WithLightbox>
          </Button>
          <PhotoForm
            formType="Edit"
            index={key}
            photo={photo}
            editPhoto={editPhoto}
          />
          <DeleteButton
            index={key}
            objectName={photo.name}
            deleteObject={deletePhoto}
          />
        </Photo>
      );
    });
  };

  return (
    <div>
      <StatusBar title={`${Object.keys(photos).lenght}Photos(s) total`}>
        <PhotoForm formType="New" photo={photos} createPhoto={createPhoto} />
      </StatusBar>
      <Card.Group itemsPerRow={4} doubling>
        {renderPhotos}
      </Card.Group>
    </div>
  );
};

PhotoList.propTypes = {
  photo: PropTypes.object.isRequired,
  photos: PropTypes.object.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  editPhoto: PropTypes.func.isRequired,
  createPhoto: PropTypes.func.isRequired,
};

export default PhotoList;
