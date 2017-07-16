import React, { Component } from 'react';
import './Workout.css';

class Workout extends Component {
  constructor(properties){
    super();
    
    this.state = {
      workout: properties.workout,
    };
    
    this.getTimeLimit = this.getTimeLimit.bind(this);
  }

  render() {
    var exercises = [];
    for (let i = 0; i < this.state.workout.exercises.length; i++){
        let exercise = this.state.workout.exercises[i];
        exercises.push(this.buildExerciseRow(exercise));
    }

    return (
      <div className="workout-wrapper">
        <div className="workout-descripton">{this.state.workout.description}</div>
        <div className="workout-type">{this.state.workout.type}</div>
        <div className="workout-target">Target: {this.state.workout.target}</div>
        <div ref="exercises" className="exercise-block">
          <div className="workout-time-limit-header">Time Limit: </div>
          <div className="workout-time-limit-time">{this.getTimeLimit()}</div>
          {exercises}
        </div>
      </div>
    );
  }

  shouldComponentUpdate (nextProps, nextState){
    // HACK(I think) if I didn't set the state variable specifically,
    // the item would not update
    this.state.workout = nextProps.workout;
    return true;
  }

  /**
  * Returns the Row displayed for each exercise
  */
  buildExerciseRow (exercise){
    var exerciseRow = (
      <div className="exercise-row">
            <div className="exercise-name">{exercise.name} </div>
            <span className="sets-and-reps">
            <div className="exercise-sets">{exercise.sets} x </div>
            <div className="exercise-reps">{exercise.reps}</div>
            </span>
      </div>
    );
    return exerciseRow;
  }

  /**
  * Returns the time limit of the workout or "None"
  */
  getTimeLimit (){
      if (this.state.workout.time_limit.length > 0){
        return this.state.workout.time_limit;
      }
      return "None";
  }

}

export default Workout;
