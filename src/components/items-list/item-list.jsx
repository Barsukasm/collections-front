import React from 'react';
import PropTypes from 'prop-types';

import Item from '../item';

const items = [
  {
    id: 'Et2S51MO',
    name: 'Ромашка',
    description: "Фантик от 'Ромашки'",
    owned: true
  }
];

const items2 = [
  {
    id: 'D09nCEtT',
    name: 'Hatsune Miku',
    description: "Фигурка 'Хатсуне Мику'",
    owned: true
  }
];

class ItemList extends React.Component {
  state = { items: [] };

  static propTypes = {
    collectionName: PropTypes.string.isRequired
  };

  componentDidMount() {
    // Заглушка до интеграции с бэком
    const { collectionName } = this.props;
    if (collectionName === 'Фигурки') {
      this.setState({ items: items2 });
    } else {
      this.setState({ items });
    }
    // Конец заглушки
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
