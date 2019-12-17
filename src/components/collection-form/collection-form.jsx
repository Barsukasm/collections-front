import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Locale from "../../locale";
import Button from "../button/button";

import "./collection-form.scss";

const locale = Locale.CollectionForm;

class CollectionForm extends React.Component {
  static propTypes = {
    addCollection: PropTypes.func.isRequired
  };

  state = {
    title: "",
    description: "",
    image: "",
    imagePreview: "",
    uploaded: false,
    fileName: ''
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  addCollection = e => {
    e.preventDefault();

    const { addCollection } = this.props;
    const { title, description, image } = this.state;

    addCollection(title, description, image);
  };

  handleSelectImage = e => {
    if (
      e.target.files[0] !== undefined &&
      e.target.files[0].type.startsWith("image/")
    ) {
      const reader = new FileReader();
      let img;
      reader.onload = ev => {
        img = ev.target.result;
        this.setState({ imagePreview: img, uploaded: true });
      };
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ image: e.target.files[0], fileName: e.target.files[0].name });
    } else {
      this.setState({ imagePreview: "", uploaded: false, image: "" });
      if (e.target.files[0] !== undefined) {
        alert(locale.notImage);
      }
    }
  };

  render() {
    const { title, description, imagePreview, uploaded, fileName } = this.state;

    return (
      <form
        className="collection-form"
        onSubmit={this.addCollection}
        encType="multipart/form-data"
      >
        <div className="collection-form__group">
          <label htmlFor="title">{locale.forTitle}</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleInputChange}
            placeholder={locale.titlePlaceholder}
          />
        </div>
        <div className="collection-form__group">
          <label htmlFor="description">{locale.forDesc}</label>
          <textarea
            className="collection-form__description"
            name="description"
            value={description}
            onChange={this.handleInputChange}
            placeholder={locale.descriptionPlaceholder}
          />
        </div>
        <div className="collection-form__group">
          <img
            className={classNames("collection-form__image", {
              " collection-form__image-loaded": uploaded
            })}
            alt=""
            src={imagePreview}
          />
          <div className="custom-image-form">
            <div className='custom-image-form__label'>{fileName}</div>
            <div className="custom-image-form__sb">Выберите файл</div>
            <input
              type="file"
              onChange={this.handleSelectImage}
              name="collection-cover"
              accept="image/*"
              className="custom-image-form__fp"
            />
          </div>
        </div>
        <Button label={locale.add} />
      </form>
    );
  }
}

export default CollectionForm;
