import React from "react";

import CollectionsList from "../collections-list";
import ItemList from "../items-list";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Root extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={CollectionsList} />
          <Route path="/:collectionId" component={ItemList} />
        </Switch>
      </Router>
    );
  }
}

export default Root;
