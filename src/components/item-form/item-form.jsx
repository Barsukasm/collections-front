import React from "react";
import PropTypes from "prop-types";

import Locale from "../../locale";
import Button from "../button/button";

import "./item-form.scss";

const locale = Locale.ItemForm;

class ItemForm extends React.Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired
  };

  state = { title: "", description: "", owned: false };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  addItem = e => {
    e.preventDefault();

    const { addItem } = this.props;
    const { title, description, owned } = this.state;

    addItem(title, description, owned);
  };

  render() {
    const { title, description, owned } = this.state;
    return (
      <form className="item-form" onSubmit={this.addItem}>
        <div className='item-form__group'>
          <label htmlFor="title">{locale.forTitle}</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder={locale.titlePlaceholder}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='item-form__group'>
          <label htmlFor="description">{locale.forDesc}</label>
          <textarea
            className='item-form__description'
            rows='4'
            cols='50'
            name="description"
            value={description}
            placeholder={locale.descriptionPlaceholder}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='item-form__group'>
          <label htmlFor="owned">{locale.forOwned}</label>
          <input
            type="checkbox"
            name="owned"
            checked={owned}
            onChange={this.handleInputChange}
          />
        </div>
        <Button label={locale.add} />
      </form>
    );
  }
}

export default ItemForm;
