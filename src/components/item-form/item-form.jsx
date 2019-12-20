import React from "react";
import PropTypes from "prop-types";

import Locale from "../../locale";
import Button from "../button/button";

import "./item-form.scss";
import classNames from "classnames";

const locale = Locale.ItemForm;

class ItemForm extends React.Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired
  };

  state = {
    title: "",
    description: "",
    owned: false,
    image: "",
    imagePreview: "",
    uploaded: false,
    fileName: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
      this.setState({
        image: e.target.files[0],
        fileName: e.target.files[0].name
      });
    } else {
      this.setState({ imagePreview: "", uploaded: false, image: "" });
      if (e.target.files[0] !== undefined) {
        alert(locale.notImage);
      }
    }
  };

  render() {
    const {
      title,
      description,
      owned,
      imagePreview,
      uploaded,
      fileName,
      image
    } = this.state;
    const { addItem } = this.props;
    return (
      <form
        className="item-form"
        onSubmit={() => {
          addItem(title, description, owned, image);
        }}
      >
        <div className="item-form__left">
          <div className="item-form__group">
            <label htmlFor="title">{locale.forTitle}</label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder={locale.titlePlaceholder}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="item-form__group">
            <label htmlFor="description">{locale.forDesc}</label>
            <textarea
              className="item-form__description"
              rows="4"
              cols="50"
              name="description"
              value={description}
              placeholder={locale.descriptionPlaceholder}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="item-form__group">
            <label htmlFor="owned">{locale.forOwned}</label>
            <input
              type="checkbox"
              name="owned"
              checked={owned}
              onChange={this.handleInputChange}
            />
          </div>
          <Button label={locale.add} />
        </div>
        <div className="item-form__right">
          <div className="item-form__group item-form__group_right">
            <img
              className={classNames("item-form__image", {
                " item-form__image-loaded": uploaded
              })}
              alt=""
              src={imagePreview}
            />
            <div className="custom-image-form">
              <div className="custom-image-form__label">{fileName}</div>
              <div className="custom-image-form__sb">Выберите файл</div>
              <input
                type="file"
                onChange={this.handleSelectImage}
                name="item-cover"
                accept="image/*"
                className="custom-image-form__fp"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ItemForm;
