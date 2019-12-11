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
  description: PropTypes.string,
  removeCollection: PropTypes.func.isRequired
};

static defaultProps = {
  description: locale.missingDescription
};
  state = {changeTitle: false, changeDescr: false};

  removeCollection = (e) => {
    e.preventDefault();

    const {removeCollection, collectionId} = this.props;

    removeCollection(collectionId);
  };

  



  render(){
    const {collectionName, collectionId, description} = this.props;
    const {changeTitle, changeDescr} = this.state;
    return(
      <div className='collection'>
        {!changeTitle && <div>{`${locale.name} ${collectionName}`} <Button label={locale.edit} /></div>}
        {!changeDescr && <div>{`${locale.desc} ${description}`} <Button label={locale.edit} /></div>}
        <Link to={`/${collectionId}/items`}><Button label={locale.toItems} /></Link>
        <Button label={locale.remove} onClick={this.removeCollection} />
      </div>
    )
  }
}


export default Collection;