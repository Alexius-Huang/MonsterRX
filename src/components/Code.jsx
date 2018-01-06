import React, { Component } from 'react';
import hljs from 'highlight.js';
import './Code.css';

class Code extends Component {
  componentDidMount() {
    const codeElement = this.refs.codeBlock;
    hljs.highlightBlock(codeElement);
  }

  render() {
    return (
      <pre className="Code">
        <code ref="codeBlock" className="javascript">{ this.props.children }</code>
      </pre>
    )
  }
}

export default Code;
