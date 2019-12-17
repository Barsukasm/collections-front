import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import Locale from "../../locale";

import "./item.scss";
import Button from "../button/button";
import classNames from "classnames";

const HOSTNAME = "http://localhost:8080/items/";
const locale = Locale.Item;

class Item extends React.Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    owned: PropTypes.bool,
    editItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
  };

  static defaultProps = {
    description: locale.missingDescription,
    owned: false
  };

  state = {
    name: "",
    description: "",
    owned: false,
    editName: false,
    editDesc: false,
    imagePreview: "",
    uploaded: false,
    image: "",
    fileName: ""
  };

  componentDidMount() {
    const { name, description, owned, path } = this.props;

    if (path !== "") {
      this.setState({
        imagePreview: `${HOSTNAME}${path.split("\\")[2]}`,
        uploaded: true
      });
    }

    this.setState({
      name,
      description,
      owned
    });
  }

  removeItem = e => {
    e.preventDefault();

    const { removeItem, itemId } = this.props;

    removeItem(itemId);
  };

  switchFlag = targetName => {
    const { itemId, editItem } = this.props;
    const { name, description, owned } = this.state;

    if (this.state[targetName]) {
      editItem(itemId, name, description, owned);
    }
    this.setState(prevState => ({
      [targetName]: !prevState[targetName]
    }));
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "owned") {
      const { editItem, itemId } = this.props;
      const { name, description } = this.state;

      editItem(itemId, name, description, value);
    }

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

      const { itemId, editItem } = this.props;
      const { name, description, owned } = this.state;
      editItem(itemId, name, description, owned, e.target.files[0]);
    } else {
      if (e.target.files[0] !== undefined) {
        alert(locale.notImage);
      }
    }
  };

  removeImage = () => {
    this.setState({
      image: "",
      fileName: "",
      imagePreview: "",
      uploaded: false
    });
    const { itemId, editItem } = this.props;
    const { name, description, owned } = this.state;
    editItem(itemId, name, description, owned, "", true);
  };

  render() {
    const {
      name,
      description,
      owned,
      editName,
      editDesc,
      imagePreview,
      uploaded,
      fileName
    } = this.state;
    return (
      <div className="item">
        <div className="item__left">
          {!editName && (
            <div className="item__title">
              {`${locale.name} ${name}`}
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={() => {
                  this.switchFlag("editName");
                }}
              />
            </div>
          )}
          {editName && (
            <div className="item__title">
              {locale.name}
              <input
                name="name"
                value={name}
                onChange={this.handleInputChange}
              />
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={() => {
                  this.switchFlag("editName");
                }}
              />
            </div>
          )}
          {!editDesc && (
            <div className="item__description">
              {`${locale.desc} ${description}`}
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={() => {
                  this.switchFlag("editDesc");
                }}
              />
            </div>
          )}
          {editDesc && (
            <div className="item__description">
              {locale.desc}
              <textarea
                className="item__desription-area"
                name="description"
                value={description}
                onChange={this.handleInputChange}
              />
              <Button
                label={locale.edit}
                onClick={() => {
                  this.switchFlag("editDesc");
                }}
              />
            </div>
          )}
          <div className="item__status">
            {`${locale.status} ${
              owned ? locale.statusPositive : locale.statusNegative
            }`}
            <input
              type="checkbox"
              name="owned"
              checked={owned}
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="item__right">
          <img
            className={classNames("item__image", {
              " item__image-loaded": uploaded
            })}
            alt=""
            src={imagePreview}
          />
          <div className="item__edit-image">
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
            <Button
              label={locale.removeImage}
              onClick={this.removeImage}
              alert={true}
            />
          </div>
        </div>
        <div className="item__footer">
          <Button
            label={locale.remove}
            onClick={this.removeItem}
            alert={true}
          />
        </div>
      </div>
    );
  }
}

export default Item;
