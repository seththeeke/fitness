import React, { Component } from 'react';
import './PoweredByReact.css';
import logo from './logo.svg';

class PoweredByReact extends Component {
  render() {
    return (
      <div className="powered-by-block">
        <div className="wrapper">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="wrapper">
          <p className="power-by-text">Powered By React</p>
        </div>
      </div>
    );
  }
}

export default PoweredByReact;
