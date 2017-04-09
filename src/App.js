import React, { Component } from 'react';
import './App.css';
import PoweredByReact from './PoweredByReact';
import WorkoutBody from './WorkoutBody';

class App extends Component {
  constructor(){
    super();
    this.workouts = require('./workouts.json');
    // console.log(this.workouts);
  }

  render() {
    return (
      <div className="App">
        <PoweredByReact />
        <WorkoutBody workouts={this.workouts}/>
      </div>
    );
  }
}

export default App;
