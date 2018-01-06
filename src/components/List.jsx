import React, { Component } from 'react';
import './List.css';

class List extends Component {
  render() {
    const { caption, data } = this.props;
    return (
      <div className="List">
        <h3 className="list-caption">{ caption }</h3>
        <ul>
          {
            data.map((item, i) => (
              <li className="list-item" key={i}>
                { item.title }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default List;
