import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import Locale from "../../locale";

const locale = Locale.ImagePicker;

class ImagePicker extends React.Component {
  state = { fileName: "", imagePreview: "", uploaded: false };
  static propTypes = {
    handleImage: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { imagePreview } = this.props;
    if (imagePreview !== "") {
      this.setState({ imagePreview, uploaded: true });
    }
  }

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
      this.props.handleImage(e.target.files[0]);

      this.setState({
        fileName: e.target.files[0].name
      });
    } else {
      if (e.target.files[0] !== undefined) {
        alert(locale.notImage);
      }
    }
  };

  render() {
    const { uploaded, fileName } = this.state;
    const { imagePreview } = this.props;
    return (
      <div>
        <img
          className={classNames("collection__image", {
            " collection__image-loaded": uploaded
          })}
          alt=""
          src={imagePreview}
        />
        <div className="collection__edit-image">
          <div className="custom-image-form">
            <div className="custom-image-form__label">{fileName}</div>
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
      </div>
    );
  }
}

export default ImagePicker;
