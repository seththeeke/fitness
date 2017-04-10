import React, { Component } from 'react';
import './WorkoutBody.css';
import Workout from './Workout';

class WorkoutBody extends Component {
  constructor(properties){
    super();
    let allWorkouts = properties.workouts;
    let filters = [];
    this.setUpFilters(allWorkouts, filters);
    this.currentFilters = [];

    this.state = {
      workoutsShown: [],
      filteredWorkouts: allWorkouts,
      filtersArray: filters,
      allWorkouts: allWorkouts
    };

    // required to bind funcion to dom for onClick event
    this.filter = this.filter.bind(this);
  }

  setUpFilters (workouts, filters){
    for (let i = 0; i < workouts.length; i++){
      let workout = workouts[i];
      this.addPropertyToFilter(filters, workout.type);
      this.addPropertyToFilter(filters, workout.target);
      let exercises = workout.exercises;
      for (let i = 0; i < exercises.length; i++){
        let exercise = exercises[i];
        this.addPropertyToFilter(filters, exercise.main_muscle_group);
        this.addPropertyToFilter(filters, exercise.secondary_muscle_groups, true);
      }
    }
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
    // either add or remove filter
    if (this.currentFilters.includes(event.object)){
      var index = this.currentFilters.indexOf(event.object);
      this.currentFilters.splice(index, 1);
    }
    else{
      this.currentFilters.push(event.object);
    }
    this.setState({
      filteredWorkouts: this.handleFilter(this.state.allWorkouts, this.currentFilters),
      workoutsShown: []
    });
  }

  handleFilter(workoutsArray, filtersArray){
      let workoutsForFilter = [];
      if (filtersArray.length === 0){
        return workoutsArray;
      }
      for (let i = 0; i < workoutsArray.length; i++){
          let isMatch = false;
          let workout = workoutsArray[i];
          if (filtersArray.includes(workout.type) || filtersArray.includes(workout.target)){
              isMatch = true;
          }
          let exercises = workout.exercises;
          for (let j = 0; j < exercises.length; j++){
              let exercise = exercises[j];
              if (filtersArray.includes(exercise.main_muscle_group)){
                isMatch = true;
              }
              for (let k = 0; k < exercise.secondary_muscle_groups.length; k++){
                  let secondary_muscle_group = exercise.secondary_muscle_groups[k];
                  if (filtersArray.includes(secondary_muscle_group)){
                    isMatch = true;
                  }
              }
          }
          if (isMatch){
              workoutsForFilter.push(workout);
          }
      }
      return workoutsForFilter;
  }

  render() {
    // Setting up checkbox filters based on string array of filters
    var filters = [];
    for (let i = 0; i < this.state.filtersArray.length; i++){
      let filter;
      let object = this.state.filtersArray[i];
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
