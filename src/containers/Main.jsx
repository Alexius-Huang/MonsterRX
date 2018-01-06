import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import DragAndDrop from '../pages/DragAndDrop';
import Pages from '../pages/pages';
import './Main.css';

class Main extends Component {
  render() {
    const renderRoutes = Pages.map((params, i) => (
      <Route exact {...params} key={i} />
    ));

    return (
      <main className="Main">
        <Switch>
          <Route exact path="/" component={ DragAndDrop } />
          { renderRoutes }
        </Switch>
      </main>
    )
  }
}

export default Main;
