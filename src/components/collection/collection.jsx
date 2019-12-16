import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import Locale from '../../locale';

import './collection.scss';

import Button from '../button/button';
import classNames from 'classnames';

const HOSTNAME = 'http://localhost:8080/';

const locale = Locale.Collection;

class Collection extends React.Component {
  static propTypes = {
    collectionName: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
    description: PropTypes.string,
    removeCollection: PropTypes.func.isRequired,
    editCollection: PropTypes.func.isRequired,
    path: PropTypes.string
  };

  static defaultProps = {
    description: locale.missingDescription,
    path: ''
  };
  state = {
    changeTitle: false,
    changeDescr: false,
    collectionName: '',
    description: '',
    imagePreview: '',
    uploaded: false,
    image: ''
  };

  componentDidMount() {
    const { collectionName, description, path } = this.props;
    if (path !== '') {
      this.setState({
        imagePreview: `${HOSTNAME}${path.split('\\')[1]}`,
        uploaded: true
      });
    }

    this.setState({
      collectionName,
      description
    });
  }

  removeCollection = (e) => {
    e.preventDefault();

    const { removeCollection, collectionId } = this.props;

    removeCollection(collectionId);
  };

  switchFlag = (name) => {
    const { collectionId, editCollection } = this.props;
    const { collectionName, description } = this.state;

    if (this.state[name]) {
      editCollection(collectionId, collectionName, description);
    }
    this.setState((prevState) => ({
      [name]: !prevState[name]
    }));
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  openCollection = (e) => {
    e.preventDefault();

    const { collectionId } = this.props;

    this.props.history.push(`/${collectionId}`);
  };

  handleSelectImage = (e) => {
    if (
      e.target.files[0] !== undefined &&
      e.target.files[0].type.startsWith('image/')
    ) {
      const reader = new FileReader();
      let img;
      reader.onload = (ev) => {
        img = ev.target.result;
        this.setState({ imagePreview: img, uploaded: true });
      };
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ image: e.target.files[0] });
    } else {
      this.setState({ imagePreview: '', uploaded: false, image: '' });
      if (e.target.files[0] !== undefined) {
        alert(locale.notImage);
      }
    }

    const { collectionId, editCollection } = this.props;
    const { collectionName, description, image } = this.state;
    editCollection(collectionId, collectionName, description, image);
  };

  render() {
    const {
      changeTitle,
      changeDescr,
      collectionName,
      description,
      imagePreview,
      uploaded
    } = this.state;
    return (
      <div className='collection'>
        <div className='collection__left'>
          {!changeTitle && (
            <div className='collection__title'>
              {`${locale.name} ${collectionName}`}
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={() => {
                  this.switchFlag('changeTitle');
                }}
              />
            </div>
          )}
          {changeTitle && (
            <div className='collection__title'>
              {`${locale.name}`}
              <input
                type='text'
                name='collectionName'
                value={collectionName}
                onChange={this.handleInputChange}
              />
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={() => {
                  this.switchFlag('changeTitle');
                }}
              />
            </div>
          )}
          {!changeDescr && (
            <div className='collection__description'>
              {`${locale.desc} ${description}`}
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={() => {
                  this.switchFlag('changeDescr');
                }}
              />
            </div>
          )}
          {changeDescr && (
            <div className='collection__description'>
              {`${locale.desc}`}
              <textarea
                className='collection__desription-area'
                name='description'
                value={description}
                onChange={this.handleInputChange}
              />
              <Button
                label={locale.edit}
                onClick={() => {
                  this.switchFlag('changeDescr');
                }}
              />
            </div>
          )}
        </div>

        <div className='collection__right'>
          <img
            className={classNames('collection__image', {
              ' collection__image-loaded': uploaded
            })}
            alt=''
            src={imagePreview}
          />
          <input
            type='file'
            onChange={this.handleSelectImage}
            name='collection-cover'
            accept='image/*'
          />
        </div>

        <div className='collection__footer'>
          <Button label={locale.toItems} onClick={this.openCollection} />
          <Button
            label={locale.remove}
            onClick={this.removeCollection}
            alert={true}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Collection);
