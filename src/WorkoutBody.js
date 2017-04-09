import React, { Component } from 'react';
import './WorkoutBody.css';
import Workout from './Workout';

class WorkoutBody extends Component {
  constructor(properties){
    super();
    this.Allworkouts = properties.workouts;
    this.filtersArray = [];
    for (let i = 0; i < this.Allworkouts.length; i++){
      let workout = this.Allworkouts[i];
      this.addPropertyToFilter(this.filtersArray, workout.type);
      this.addPropertyToFilter(this.filtersArray, workout.target);
      let exercises = workout.exercises;
      for (let i = 0; i < exercises.length; i++){
        let exercise = exercises[i];
        this.addPropertyToFilter(this.filtersArray, exercise.main_muscle_group);
        this.addPropertyToFilter(this.filtersArray, exercise.secondary_muscle_groups, true);
      }
    }
    this.currentFilters = [];
    // console.log(this.filtersArray);

    this.state = {
      date: "Hello",
      workoutsShown: [],
      filteredWorkouts: this.Allworkouts
    };

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
    this.currentFilters.push(event.object);
    var filtsWorks = this.handleFilter(this.Allworkouts, this.currentFilters);
    this.setState({
      date: "Stuff",
      filteredWorkouts: filtsWorks,
      workoutsShown: []
    });
  }

  handleFilter(workoutsArray, filtersArray){
      // return an array of the workouts to show
      return this.Allworkouts.splice(0, 1);
  }

  render() {
    // Setting up checkbox filters based on string array of filters
    var filters = [];
    for (let i = 0; i < this.filtersArray.length; i++){
      let filter;
      let object = this.filtersArray[i];
      filter = 
        <div className="input">
        <input id="{object}" type="checkbox" className="filter-checkbox" onClick={() => this.filter({object})}></input>
        <label for="{object}">{object}</label>
        </div>
      filters.push(filter);
    }

    // set up workouts to show based on filter
    for (let i = 0; i < this.state.filteredWorkouts.length; i++){
        let workout = this.state.filteredWorkouts[i];
        this.state.workoutsShown.push(
          <Workout workout={workout}/>
        )
    }

    return (
      <div>
        <div>{this.state.date}</div>
        <div className="filter-toolbar">
        <h1>Seth's Gym</h1>
            {filters}
        </div>
        <div>
          {this.state.workoutsShown}
        </div>
      </div>
    );
  }
}

export default WorkoutBody;
