import React from 'react';

import Item from '../item';
import collectionsApi from '../../api/collections-api';

class ItemList extends React.Component {
  state = { items: [], loading: false, message: null };

  componentDidMount() {
    this.setState({ loading: true });
    collectionsApi
      .get(`/collections/${this.props.match.params.collectionId}/items`)
      .then((response) => {
        console.log('Response from get items: ', response);
        if (response.data.status === 'OK') {
          const items = response.data.data;
          this.setState({ items, loading: false });
        } else {
          this.setState({ message: response.data.message });
        }
      })
      .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));
  }

  render() {
    const { items } = this.state;
    return (
      <div className='item-list'>
        {items.map(({ name, description, owned, id }) => (
          <Item key={id} name={name} description={description} owned={owned} />
        ))}
      </div>
    );
  }
}

export default ItemList;
