import React, { Component } from 'react';
import './App.css';
import PoweredByReact from './PoweredByReact';
import WorkoutBody from './WorkoutBody';
import Menu from './Menu';
import Home from './Home';

class App extends Component {
  constructor(){
    super();
    
    // Read in Workouts JSON
    this.workouts = require('./workouts.json');

    // Must bind this to functions before adding event listeners
    // or refs is undefined
    this._navHome = this._navHome.bind(this);
    this._navToWorkouts = this._navToWorkouts.bind(this);

    // Navigation Event Listeners
    document.addEventListener("nav-home", this._navHome);
    document.addEventListener("nav-workouts", this._navToWorkouts);
  }

  render() {
    return (
      <div className="App">
        <PoweredByReact></PoweredByReact>
        <Menu></Menu>
        <div ref="home">
          <Home></Home>
        </div>
        <div ref="workouts" hidden>
          <WorkoutBody workouts={this.workouts}></WorkoutBody>
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
