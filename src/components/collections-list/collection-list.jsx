import React from 'react';

import Collection from '../collection';
import collectionsApi from '../../api/collections-api';
import CollectionForm from "../collection-form/collection-form";

class CollectionsList extends React.Component {
  state = { collections: [], loading: false, message: null };

  componentDidMount() {
    this.setState({ loading: true });
    collectionsApi
      .get('/collections')
      .then((response) => {
        console.log('Response from get collections: ', response);
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
      .post('/collections',{
        name: title,
        description,
        items: []
      })
      .then((response) => {
        this.setState((prevState) => ({
          collections: [
            ...prevState.collections,
            response.data.data
          ],
          loading: false
        }));
      })
      .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));

  };

  render() {
    const { collections } = this.state;
    return (
      <div>
        <CollectionForm addCollection={this.addCollection}/>
        {collections.map(({ id, name, description }) => (
          <Collection
            key={id}
            collectionName={name}
            collectionId={id}
            description={description}
          />
        ))}
      </div>
    );
  }
}

export default CollectionsList;
