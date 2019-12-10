import React from 'react';
import PropTypes from 'prop-types';

import Locale from '../../locale';
import Button from "../button/button";

import './collection-form.scss';

const locale = Locale.CollectionForm;

class CollectionForm extends React.Component{
  static propTypes = {
    addCollection: PropTypes.func.isRequired
  };

  state = {title:'', description: ''};

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState({
      [name]: value
    });
  };

  addCollection = (e) => {
    e.preventDefault();

    const {addCollection} = this.props;
    const {title, description} = this.state;

    addCollection(title, description);
  };


  render() {
    const {title, description} = this.state;
    return(
      <form className='collection-form' onSubmit={this.addCollection}>
        <input type='text' name='title' value={title} onChange={this.handleInputChange}/>
        <input type='text' name='description' value={description} onChange={this.handleInputChange}/>
        <Button label={locale.add}/>
      </form>
    )
  }
}

export default CollectionForm;