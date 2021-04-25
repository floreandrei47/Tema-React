import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button, Icon, Message } from "semantic-ui-react";

class PhotoForm extends React.Component {
  state = {
    error: false,
    modalOpen: false,
    photo: {
      name: "",
      description: "",
      tags: [],
      Id: [],
    },
  };

  handleInputChange = (name, value) => {
    const { photo } = this.state;
    const updatePhoto = {
      ...photo,
      [name]: value,
    };

    this.setState({
      photo: updatePhoto,
    });
  };

  isFormValid = () => {
    const { photo } = this.state;

    if (!photo) return false;
    else if (!photo.name) return false;
    else if (!photo.description) return false;
    else if (!photo.tags || photo.tags.length === 0) return false;
    else if (!photo.Id || photo.Id.length === 0) return false;

    return true;
  };

  handleSubmit = (event) => {
    if (!this.isFormValid()) {
      this.setState({ error: true });
      return;
    }

    this.setState({ error: false });

    const { updatePhoto, createPhoto, index } = this.props;
    const { photo } = this.state;

    if (this.isNewForm()) {
      createPhoto(photo);
    } else {
      updatePhoto(index, photo);
    }

    this.closeForm();
  };

  showForm = () => {
    const { photo } = this.props;
    this.setState({
      modalOpen: true,
      photo,
    });
  };

  closeForm = () => this.setState({ modalOpen: false });
  isNewForm = () => this.props.formType === "New";

  render() {
    const { modalOpen, photo, error } = this.state;
    // const { photo: propsPhoto } = this.props;

    // const options = Object.keys(propsPhoto).map((key) => {
    //   const photo = propsPhoto[key];
    //   return {
    //     text: propsPhoto.title,
    //     value: key,
    //     image: { avatar: true, src: propsPhoto.url },
    //   };
    // });
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
          {this.isNewForm() ? "Create Photo" : `Edit: ${photo.name}`}
        </Modal.Header>
        <Modal.Content>
          <Form error={error}>
            <Message error content="Please fill out all the fiels" />
            <Form.Input
              name="name"
              label="Name"
              placeholder="Photo name"
              defaultvalue={this.isNewForm() ? "" : photo.name}
              onChange={(e) =>
                this.handleInputChange(e.target.name, e.target.value)
              }
              required
            />
            <Form.TextArea
              name="description"
              label="Description"
              placeholder="Please describe this photo"
              defaultvalue={this.isNewForm() ? "" : photo.description}
              onChange={(e) =>
                this.handleInputChange(e.targe.name, e.target.value)
              }
              required
            />
            <Form.Input
              name="tags"
              label="Tags"
              placeholder="Please enter the tags separeted by '|' vertical bar (pipe)"
              defaultvalue={this.isNewForm() ? "" : photo.tags.join("|")}
              onChange={(e) =>
                this.handleInputChange(e.targe.name, e.target.value.split("|"))
              }
              required
              icon="tags"
              iconPosition="left"
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

    index: PropTypes.string,
    editPhoto: PropTypes.func,
    createPhoto: PropTypes.func,
  };
}

export default PhotoForm;
