import React from 'react';

import Collection from '../collection';
import collectionsApi from '../../api/collections-api';

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

  render() {
    const { collections } = this.state;
    return (
      <div>
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
