import React from 'react';
import PropTypes from 'prop-types';

import Item from '../item';
import collectionsApi from '../../api/collections-api';


class ItemList extends React.Component {
  state = { items: [], loading: false, message: null };

  static propTypes = {
    collectionName: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.setState({ loading: true });
    collectionsApi
      .get(`/collections/${this.props.collectionId}/items`)
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
