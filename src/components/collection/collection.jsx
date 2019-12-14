import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import Locale from '../../locale';

import './collection.scss';

import Button from '../button/button';

const locale = Locale.Collection;

class Collection extends React.Component {
  static propTypes = {
    collectionName: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
    description: PropTypes.string,
    removeCollection: PropTypes.func.isRequired,
    editCollection: PropTypes.func.isRequired
  };

  static defaultProps = {
    description: locale.missingDescription
  };
  state = {
    changeTitle: false,
    changeDescr: false,
    collectionName: '',
    description: ''
  };

  componentDidMount() {
    const { collectionName, description } = this.props;

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

  render() {
    const {
      changeTitle,
      changeDescr,
      collectionName,
      description
    } = this.state;
    return (
      <div className='collection'>
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

        <Button label={locale.toItems} onClick={this.openCollection} />
        <Button
          label={locale.remove}
          onClick={this.removeCollection}
          alert={true}
        />
      </div>
    );
  }
}

export default withRouter(Collection);
