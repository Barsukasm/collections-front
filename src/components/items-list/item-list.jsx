import React from "react";

import Item from "../item";
import collectionsApi from "../../api/collections-api";
import ItemForm from "../item-form";
import Button from "../button/button";
import Locale from "../../locale";
import classNames from 'classnames';

import "./item-list.scss";

const locale = Locale.ItemList;

class ItemList extends React.Component {
  state = { items: [], loading: false, message: null };

  componentDidMount() {
    this.setState({ loading: true });
    collectionsApi
      .get(`/collections/${this.props.match.params.collectionId}/items`)
      .then(response => {
        console.log("Response from get items: ", response);
        if (response.data.status === "OK") {
          const items = response.data.data;
          this.setState({ items, loading: false });
        } else {
          this.setState({ message: response.data.message });
        }
      })
      .catch(() => this.setState({ message: "NETWORK_ERROR", loading: false }));
  }

  addItem = (title, description, owned) => {
    this.setState({ loading: true });
    collectionsApi
      .post(`/collections/${this.props.match.params.collectionId}/items`, {
        name: title,
        description,
        owned
      })
      .then(response => {
        if (response.data.status === "OK") {
          this.setState(prevState => ({
            items: [...prevState.items, response.data.data],
            loading: false
          }));
        }
      })
      .catch(() => this.setState({ message: "NETWORK_ERROR", loading: false }));
  };

  editItem = (id, title, description, owned) => {
    this.setState({ loading: true });
    collectionsApi
      .patch(
        `/collections/${this.props.match.params.collectionId}/items/${id}`,
        {
          name: title,
          description,
          owned
        }
      )
      .then(response => {
        if (response.data.status === "OK") {
          const updatedItem = response.data.data;
          this.setState(prevState => ({
            items: [
              ...prevState.items.map(item => {
                if (item.id === updatedItem.id) {
                  return updatedItem;
                }
                return item;
              })
            ],
            loading: false
          }));
        }
      })
      .catch(() => this.setState({ message: "NETWORK_ERROR", loading: false }));
  };

  removeItem = id => {
    this.setState({ loading: true });
    collectionsApi
      .delete(
        `/collections/${this.props.match.params.collectionId}/items/${id}`
      )
      .then(response => {
        if (response.data.status === "OK") {
          this.setState(prevState => ({
            items: [...prevState.items.filter(item => item.id !== id)],
            loading: false
          }));
        }
      })
      .catch(() => this.setState({ message: "NETWORK_ERROR", loading: false }));
  };

  backToCollections = e => {
    e.preventDefault();

    this.props.history.push("/");
  };

  render() {
    const { items, loading } = this.state;
    return (
      <div className={classNames("item-list", {' item-list__loading': loading})}>
        <ItemForm addItem={this.addItem} />
        {items.length===0 && <div>{locale.emptyItems}</div>}
        {items.length>0 && items.map(({ name, description, owned, id }) => (
          <Item
            key={id}
            itemId={id}
            name={name}
            description={description}
            owned={owned}
            editItem={this.editItem}
            removeItem={this.removeItem}
          />
        ))}
        <Button label={locale.back} onClick={this.backToCollections} />
      </div>
    );
  }
}

export default ItemList;
