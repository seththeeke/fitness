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

  }

  _navToWorkouts(){

  }
}

export default Menu;
