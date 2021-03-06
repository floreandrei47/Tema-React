import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button, Icon, Message } from "semantic-ui-react";

class AlbumForm extends React.Component {
  state = {
    error: false,
    modalOpen: false,
    album: {
      name: "",
      description: "",
      tags: [],
      photosIds: [],
    },
  };

  handleInputChange = (name, value) => {
    const { album } = this.state;
    const updateAlbum = {
      ...album,
      [name]: value,
    };

    this.setState({
      album: updateAlbum,
    });
  };

  isFormValid = () => {
    const { album } = this.state;

    if (!album) return false;
    else if (!album.name) return false;
    else if (!album.description) return false;
    else if (!album.tags || album.tags.length === 0) return false;
    else if (!album.photosIds || album.photosIds.length === 0) return false;

    return true;
  };

  handleSubmit = (event) => {
    if (!this.isFormValid()) {
      this.setState({ error: true });
      return;
    }

    this.setState({ error: false });

    const { updateAlbum, createAlbum, index } = this.props;
    const { album } = this.state;

    if (this.isNewForm()) {
      createAlbum(album);
    } else {
      updateAlbum(index, album);
    }

    this.closeForm();
  };

  showForm = () => {
    const { album } = this.props;
    this.setState({
      modalOpen: true,
      album,
    });
  };

  closeForm = () => this.setState({ modalOpen: false });
  isNewForm = () => this.props.formType === "New";

  render() {
    const { modalOpen, album, error } = this.state;
    const { photos } = this.props;

    const options = Object.keys(photos).map((key) => {
      const photo = photos[key];
      return {
        text: photo.title,
        value: key,
        image: { avatar: true, src: photo.url },
      };
    });
    return (
      <Modal
        trigger={
          <Button Icon onClick={this.showForm}>
            <Icon name={this.isNewForm() ? "plus" : "edit"} />
          </Button>
        }
        closeIcon
        open={modalOpen}
        onClose={this.closeForm}
      >
        <Modal.Header>
          {this.isNewForm() ? "Create Album" : `Edit: ${album.name}`}
        </Modal.Header>
        <Modal.Content>
          <Form error={error}>
            <Message error content="Please fill out all the fiels" />
            <Form.Input
              name="name"
              label="Name"
              placeholder="Album name"
              defaultvalue={this.isNewForm() ? "" : album.name}
              onChange={(e) =>
                this.handleInputChange(e.target.name, e.target.value)
              }
              required
            />
            <Form.TextArea
              name="description"
              label="Description"
              placeholder="Please describe this album"
              defaultvalue={this.isNewForm() ? "" : album.description}
              onChange={(e) =>
                this.handleInputChange(e.targe.name, e.target.value)
              }
              required
            />
            <Form.Input
              name="tags"
              label="Tags"
              placeholder="Please enter the tags separeted by '|' vertical bar (pipe)"
              defaultvalue={this.isNewForm() ? "" : album.tags.join("|")}
              onChange={(e) =>
                this.handleInputChange(e.targe.name, e.target.value.split("|"))
              }
              required
              icon="tags"
              iconPosition="left"
            />
            <Form.Dropdown
              name="photosIds"
              label="Photos"
              placeholder="Select photos for this album"
              defaultvalue={this.isNewForm() ? "" : album.photosIds}
              onChange={(e, data) =>
                this.handleInputChange(data.name, data.value)
              }
              required
              fluid
              multiple
              selection
              options={options}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="save"
            content="Save"
            onClick={(e) => {
              this.handleSubmit(e);
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  static PropTypes = {
    formType: PropTypes.oneOf(["New", "Edit"]).isRequired,
    photo: PropTypes.object.isRequired,
    album: PropTypes.object,
    index: PropTypes.string,
    editAlbum: PropTypes.func,
    createAlbum: PropTypes.func,
  };
}

export default AlbumForm;
