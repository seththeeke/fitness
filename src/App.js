import React, { Component } from 'react';
import './App.css';
import PoweredByReact from './PoweredByReact';
import WorkoutBody from './WorkoutBody';

class App extends Component {
  constructor(){
    super();
    this.workout = 
    {
      type: "aerobic", 
      description: "stuff",
      target: "Full Body",
      exercises: [
          {
            name: "Bench",
            sets: "3", 
            reps: "2", 
            mainMuscleGroup: "Chest", 
            secondaryMuscleGroups: ["Biceps", "Triceps"]
          }
      ] 
    };
    this.workouts = [this.workout];
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
