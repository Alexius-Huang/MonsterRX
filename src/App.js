import React, { Component } from 'react';
import Aside from './containers/Aside';
import Main from './containers/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Aside />
        <Main />
      </div>
    );
  }
}

export default App;
