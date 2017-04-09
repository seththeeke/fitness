import React, { Component } from 'react';
import './WorkoutBody.css';
import Workout from './Workout';

class WorkoutBody extends Component {
  constructor(properties){
    super();
    this.workouts = properties.workouts;
    this.filtersArray = [];
    for (let i = 0; i < this.workouts.length; i++){
      let workout = this.workouts[i];
      this.addPropertyToFilter(this.filtersArray, workout.type);
      this.addPropertyToFilter(this.filtersArray, workout.target);
      let exercises = workout.exercises;
      for (let i = 0; i < exercises.length; i++){
        let exercise = exercises[i];
        this.addPropertyToFilter(this.filtersArray, exercise.main_muscle_group);
        this.addPropertyToFilter(this.filtersArray, exercise.secondary_muscle_groups, true);
      }
    }
    // console.log(this.filtersArray);

    // required to bind funcion to dom
    this.filter = this.filter.bind(this);
  }

  addPropertyToFilter (array, item, isArrayOfItems){
    if (isArrayOfItems){
      for (let i = 0; i < item.length; i++){
        let singleItem = item[i];
        if (array.indexOf(singleItem) < 0){
          array.push(singleItem);
        }
      }
    }
    else{
      if (array.indexOf(item) < 0){
          array.push(item);
      }
    }
  }

  filter (event){

  }

  render() {
    var filters = [];
    for (let i = 0; i < this.filtersArray.length; i++){
      let filter;
      let object = this.filtersArray[i];
      filter = 
        <div className="input">
        <input id="{object}" type="checkbox" className="filter-checkbox" onClick={this.filter}></input>
        <label for="{object}">{object}</label>
        </div>
      filters.push(filter);
    }
    var workouts = [];
    for (let i = 0; i < this.workouts.length; i++){
        let workout = this.workouts[i];
        workouts.push(
          <Workout workout={workout}/>
        )
    }
    // console.log(filters);

    return (
      <div>
        <div className="filter-toolbar">
        <h1>Seth's Gym</h1>
            {filters}
        </div>
        <div>
          {workouts}
        </div>
      </div>
    );
  }
}

export default WorkoutBody;
