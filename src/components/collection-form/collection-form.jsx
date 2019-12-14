import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Locale from '../../locale';
import Button from '../button/button';

import './collection-form.scss';

const locale = Locale.CollectionForm;

class CollectionForm extends React.Component {
  static propTypes = {
    addCollection: PropTypes.func.isRequired
  };

  state = { title: '', description: '', image: '', uploaded: false };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  addCollection = (e) => {
    e.preventDefault();

    const { addCollection } = this.props;
    const { title, description } = this.state;

    addCollection(title, description);
  };

  handleSelectImage = (e) => {
    const reader = new FileReader();
    let img;
    reader.onload = (ev) => {
      img = ev.target.result;
      console.log(img);
      this.setState({ image: img, uploaded: true });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { title, description, image, uploaded } = this.state;
    console.log(image);

    return (
      <form className='collection-form' onSubmit={this.addCollection}>
        <div className='collection-form__group'>
          <label htmlFor='title'>{locale.forTitle}</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={this.handleInputChange}
            placeholder={locale.titlePlaceholder}
          />
        </div>
        <div className='collection-form__group'>
          <label htmlFor='description'>{locale.forDesc}</label>
          <textarea
            className='collection-form__description'
            name='description'
            value={description}
            onChange={this.handleInputChange}
            placeholder={locale.descriptionPlaceholder}
          />
        </div>
        <div className='collection-form__group'>
          <img
            className={classNames('collection-form__image', {
              ' collection-form__image-loaded': uploaded
            })}
            alt=''
            src={image}
          />
          <input type='file' onChange={this.handleSelectImage} />
        </div>
        <Button label={locale.add} />
      </form>
    );
  }
}

export default CollectionForm;
