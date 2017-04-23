import React, { Component } from 'react';
import './App.css';
import PoweredByReact from './PoweredByReact';
import WorkoutBody from './WorkoutBody';
import Menu from './Menu';
import Home from './Home';

class App extends Component {
  constructor(){
    super();
    this.workouts = require('./workouts.json');

    this._navHome = this._navHome.bind(this);
    this._navToWorkouts = this._navToWorkouts.bind(this);
  }

  render() {
    return (
      <div className="App">
        <PoweredByReact />
        <div className="menu-container">
          <div className="menu-button" onClick={this._navHome}>Home</div>
          <div className="menu-button" onClick={this._navToWorkouts}>Workouts</div>
        </div>
        <div ref="home">
          <Home/>
        </div>
        <div ref="workouts" hidden>
          <WorkoutBody workouts={this.workouts}/>
        </div>
      </div>
    );
  }

  _navHome(){
    this.refs.home.hidden = false;
    this.refs.workouts.hidden = true;
  }

  _navToWorkouts(){
    this.refs.home.hidden = true;
    this.refs.workouts.hidden = false;
  }
}

export default App;
