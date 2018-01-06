import React, { Component } from 'react';
import Title from '../components/Title';
import Caption from '../components/Caption';

class Cancellable extends Component {
  render() {
    return (
      <div className="Cancellable">
        <Title>Cancellable Example</Title>

        <div className="content">
          <Caption>Cancellable Example</Caption>
          Working in progress...
        </div>
      </div>
    )
  }
}

export default Cancellable;
