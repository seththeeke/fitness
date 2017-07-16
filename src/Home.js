import React, { Component } from 'react';
import './Home.css';
import weights from './weights.jpg';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
          <div className="quote-container">
	          <div className="quote">
	          	<span>"The </span>
	          	<span className="highlight">winner </span>
	          	<span>is the person for whom </span>
	          	<span className="highlight">defeat </span>
	          	<span>is the </span>
	          	<span className="highlight">least </span>
	          	<span>acceptable rationalization"</span>
	          	<span className="quote-signature"> - Tim Noakes</span>
	          </div>
          </div>
      </div>
    );
  }
}

export default Home;
