import React from "react";
import PropTypes from "prop-types";

import Locale from "../../locale";

import "./item.scss";
import Button from "../button/button";

const locale = Locale.Item;

class Item extends React.Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    owned: PropTypes.bool,
    editItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
  };

  static defaultProps = {
    description: locale.missingDescription,
    owned: false
  };

  state = {
    name: "",
    description: "",
    owned: false,
    editName: false,
    editDesc: false
  };

  componentDidMount() {
    const { name, description, owned } = this.props;

    this.setState({
      name,
      description,
      owned
    });
  }

  removeItem = e => {
    e.preventDefault();

    const { removeItem, itemId } = this.props;

    removeItem(itemId);
  };

  switchFlag = e => {
    e.preventDefault();
    const targetName = e.target.name;
    const { itemId, editItem } = this.props;
    const { name, description, owned } = this.state;

    if (this.state[targetName]) {
      editItem(itemId, name, description, owned);
    }
    this.setState(prevState => ({
      [targetName]: !prevState[targetName]
    }));
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "owned") {
      const { editItem, itemId } = this.props;
      const { name, description } = this.state;

      editItem(itemId, name, description, value);
    }

    this.setState({
      [name]: value
    });
  };

  render() {
    const { name, description, owned, editName, editDesc } = this.state;
    return (
      <div className="item">
        {!editName && (
          <div>
            {`${locale.name} ${name}`}{" "}
            <Button
              label={locale.edit}
              name="editName"
              onClick={this.switchFlag}
            />
          </div>
        )}
        {editName && (
          <div>
            {locale.name}{" "}
            <input name="name" value={name} onChange={this.handleInputChange} />{" "}
            <Button
              label={locale.edit}
              name="editName"
              onClick={this.switchFlag}
            />
          </div>
        )}
        {!editDesc && (
          <div>
            {`${locale.desc} ${description}`}{" "}
            <Button
              label={locale.edit}
              name="editDesc"
              onClick={this.switchFlag}
            />
          </div>
        )}
        {editDesc && (
          <div>
            {locale.desc}{" "}
            <input
              name="description"
              value={description}
              onChange={this.handleInputChange}
            />{" "}
            <Button
              label={locale.edit}
              name="editDesc"
              onClick={this.switchFlag}
            />
          </div>
        )}
        <div>
          {`${locale.status} ${
            owned ? locale.statusPositive : locale.statusNegative
          }`}
          <input
            type="checkbox"
            name="owned"
            checked={owned}
            onChange={this.handleInputChange}
          />
        </div>
        <Button label={locale.remove} onClick={this.removeItem} />
      </div>
    );
  }
}

export default Item;
