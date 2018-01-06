import React, { Component } from 'react';
import List from '../components/List';
import './Aside.css';

import { RxExampleCategories, RxExamples } from '../data'

class Aside extends Component {
  render() {
    const renderLists = RxExampleCategories.map((category, i) => {
      const data = RxExamples.filter(example => example.categoryID === category.id);
      return <List caption={ category.title } data={data} />
    })

    return (
      <aside className="Aside">
        <h1>MonsterRx</h1>
        { renderLists }
      </aside>
    )
  }
}

export default Aside;
