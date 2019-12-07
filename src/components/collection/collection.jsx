import React from 'react';
import PropTypes from 'prop-types';

import ItemList from '../items-list';

import Locale from '../../locale';

import './collection.scss';

const locale = Locale.Collection;

class Collection extends React.Component{
static propTypes = {
  collectionName: PropTypes.string.isRequired,
  description: PropTypes.string
}

static defaultProps = {
  description: locale.missingDescription
}

  render(){
    const {collectionName, description} = this.props
    return(
      <div className='collection'>
        <div>{`${locale.name} ${collectionName}`}</div>
        <div>{`${locale.desc} ${description}`}</div>
        <ItemList collectionName={collectionName} />
      </div>
    )
  }
}

export default Collection;