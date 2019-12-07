import React from 'react';
import PropTypes from 'prop-types';

import Locale from '../../locale';

import './item.scss';

const locale = Locale.Item;

class Item extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    owned: PropTypes.bool
  };

  static defaultProps = {
    description: locale.missingDescription,
    owned: false
  };

  render() {
    const { name, description, owned } = this.props;
    return (
      <div className='item'>
        <div>{`${locale.name} ${name}`}</div>
        <div>{`${locale.desc} ${description}`}</div>
        <div>{`${locale.status} ${
          owned ? locale.statusPositive : locale.statusNegative
        }`}</div>
      </div>
    );
  }
}

export default Item;
