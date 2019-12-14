import React from 'react';

import Collection from '../collection';
import collectionsApi from '../../api/collections-api';
import CollectionForm from '../collection-form/collection-form';
import classNames from 'classnames';

import './collection-list.scss';

class CollectionsList extends React.Component {
  state = { collections: [], loading: false, message: null };

  componentDidMount() {
    this.setState({ loading: true });
    collectionsApi
      .get('/collections')
      .then((response) => {
        if (response.data.status === 'OK') {
          const collections = response.data.data;
          this.setState({ collections, loading: false });
        } else {
          this.setState({ message: response.data.message });
        }
      })
      .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));
  }

  addCollection = (title, description) => {
    this.setState({ loading: true });
    collectionsApi
      .post('/collections', {
        name: title,
        description,
        items: []
      })
      .then((response) => {
        this.setState((prevState) => ({
          collections: [...prevState.collections, response.data.data],
          loading: false
        }));
      })
      .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));
  };

  removeCollection = (collectionId) => {
    this.setState({ loading: true });
    collectionsApi
      .delete(`/collections/${collectionId}`)
      .then((response) => {
        if (response.data.status === 'OK') {
          this.setState((prevState) => ({
            collections: [
              ...prevState.collections.filter(
                (collection) => collection.id !== collectionId
              )
            ],
            loading: false
          }));
        }
      })
      .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));
  };

  editCollection = (collectionId, newTitle, newDescription) => {
    this.setState({ loading: true });
    collectionsApi
      .patch(`/collections/${collectionId}`, {
        title: newTitle,
        description: newDescription
      })
      .then((response) => {
        const newCollection = response.data.data;
        if (response.data.status === 'OK') {
          this.setState((prevState) => ({
            collections: [
              ...prevState.collections.map((collection) => {
                if (collection.id === collectionId) {
                  return newCollection;
                }
                return collection;
              })
            ],
            loading: false
          }));
        }
      })
      .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));
  };

  render() {
    const { collections, loading } = this.state;
    return (
      <div
        className={classNames('collection-list', {
          ' collection-list__loading': loading
        })}
      >
        <CollectionForm addCollection={this.addCollection} />
        {collections.map(({ id, name, description }) => (
          <Collection
            key={id}
            collectionName={name}
            collectionId={id}
            description={description}
            removeCollection={this.removeCollection}
            editCollection={this.editCollection}
          />
        ))}
      </div>
    );
  }
}

export default CollectionsList;
