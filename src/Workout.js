import React, { Component } from 'react';
import './Workout.css';

class Workout extends Component {
  constructor(properties){
    super();
    this.state = {
      workout: properties.workout,
    };
    this.expand = this.expand.bind(this);
    this.getTimeLimit = this.getTimeLimit.bind(this);
  }

  expand (event){
    this.refs.exercises.hidden = !this.refs.exercises.hidden;
  }

  getTimeLimit (){
      if (this.state.workout.time_limit.length > 0){
        return this.state.workout.time_limit;
      }
      return "None";
  }

  shouldComponentUpdate (nextProps, nextState){
    this.state.workout = nextProps.workout;
    return true;
  }

  render() {
    var exercises = [];
    for (let i = 0; i < this.state.workout.exercises.length; i++){
        let exercise = this.state.workout.exercises[i];
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
        <div className="workout-descripton">{this.state.workout.description}</div>
        <div className="workout-type">{this.state.workout.type}</div>
        <div className="workout-target">Target: {this.state.workout.target}</div>
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
