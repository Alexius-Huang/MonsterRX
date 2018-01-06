import React, { Component } from 'react';
import './Caption.css';

class Caption extends Component {
  render() {
    return (
      <h2 className="Caption">{ this.props.children }</h2>
    )
  }
}

export default Caption;
