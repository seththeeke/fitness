import React, { Component } from 'react';
import './Workout.css';

class Workout extends Component {
  constructor(properties){
    super();
    this.workout = properties.workout;
    // console.log(this.workout);

    this.expand = this.expand.bind(this);
  }

  expand (event){
    // console.log(this.workout.exercises);
    this.refs.exercises.hidden = !this.refs.exercises.hidden;
  }

  getTimeLimit (){
      if (this.workout.time_limit.length > 0){
        return this.workout.time_limit;
      }
      return "None";
  }

  render() {
    var exercises = [];
    for (let i = 0; i < this.workout.exercises.length; i++){
        let exercise = this.workout.exercises[i];
        exercises.push(
          <div className="exercise-row">
            <div className="exercise-name">{exercise.name} </div>
            <div className="exercise-sets">{exercise.sets} x </div>
            <div className="exercise-reps">{exercise.reps}</div>
          </div>
        );
    }

    return (
      <div className="workout-wrapper" onClick={this.expand}>
        <div className="workout-descripton">{this.workout.description}</div>
        <div className="workout-type">{this.workout.type}</div>
        <div className="workout-target">Target: {this.workout.target}</div>
        <div ref="exercises" className="exercise-block" hidden>
          <div className="workout-time-limit-header">Time Limit: </div>
          <div className="workout-time-limit-time">{this.getTimeLimit()}</div>
          {exercises}
        </div>
      </div>
    );
  }
}

export default Workout;
