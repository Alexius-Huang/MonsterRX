import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import './List.css';

class List extends Component {
  render() {
    const { caption, data, location: { pathname } } = this.props;
    return (
      <div className="List">
        <h3 className="list-caption">{ caption }</h3>
        <ul>
          {
            data.map((item, i) => (
              <li className={`list-item ${ pathname === item.path ? 'active' : '' }`} key={i}>
                <Link to={ item.path }>
                  { item.title }
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default withRouter(List);
