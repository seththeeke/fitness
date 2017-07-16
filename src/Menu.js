import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {

  render() {
    return (
      <div className="menu-container">
          <div className="menu-button" onClick={this._navHome}>Home</div>
          <div className="menu-button" onClick={this._navToWorkouts}>Workouts</div>
      </div>
    );
  }

  _navHome(){
      var navEvent = new CustomEvent("nav-home");
      document.dispatchEvent(navEvent);
  }

  _navToWorkouts(){
      var navEvent = new CustomEvent("nav-workouts");
      document.dispatchEvent(navEvent);
  }
}

export default Menu;
