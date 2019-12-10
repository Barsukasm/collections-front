import React from 'react';
import PropTypes from 'prop-types';


import Locale from '../../locale';

import './collection.scss';

import {Link} from 'react-router-dom';
import Button from "../button/button";

const locale = Locale.Collection;


class Collection extends React.Component{
static propTypes = {
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  description: PropTypes.string
};

static defaultProps = {
  description: locale.missingDescription
};



  render(){
    const {collectionName, collectionId, description} = this.props;
    return(
      <div className='collection'>
        <div>{`${locale.name} ${collectionName}`}</div>
        <div>{`${locale.desc} ${description}`}</div>
        <Link to={`/${collectionId}/items`}><Button label={locale.toItems} /></Link>
      </div>
    )
  }
}


export default Collection;