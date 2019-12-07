import React from 'react';

import Collection from '../collection';

const collections = [
  {
    id: 'ukMHPWc-',
    name: 'Фантики',
    description: 'new description'
  },
  {
    id: 'npxuLGFA',
    name: 'Фигурки',
    description: 'Коллекция фигурок'
  }
];

class CollectionsList extends React.Component {
  state = { collections };
  render() {
    const { collections } = this.state;
    return (
      <div>
        {collections.map(({ id, name, description }) => (
          <Collection key={id} collectionName={name} description={description} />
        ))}
      </div>
    );
  }
}

export default CollectionsList;
