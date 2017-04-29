import React, { Component } from 'react';
import './WorkoutBody.css';
import Workout from './Workout';
import FilterToolbar from './FilterToolbar';

class WorkoutBody extends Component {
  constructor(properties){
    super();
    
    this.currentFilters = [];

    this.state = {
      workoutsShown: [],
      filteredWorkouts: properties.workouts,
      allWorkouts: properties.workouts
    };

    // required to bind funcion to dom for onClick event
    this.filter = this.filter.bind(this);

    document.addEventListener("filter-workouts", this.filter);
  }

  render() {
    // set up workouts to show based on filter
    for (let i = 0; i < this.state.filteredWorkouts.length; i++){
        let workout = this.state.filteredWorkouts[i];
        this.state.workoutsShown.push(
          <Workout workout={workout}/>
        )
    }

    return (
      <div>
        <FilterToolbar allWorkouts={this.state.allWorkouts}></FilterToolbar>
        <div>
          {this.state.workoutsShown}
        </div>
      </div>
    );
  }

  /**
  * Either adds or removes filter from current filters
  * and then accounts for the current filters
  */
  filter (event){
    // either add or remove filter
    if (this.currentFilters.includes(event.detail)){
      var index = this.currentFilters.indexOf(event.detail);
      this.currentFilters.splice(index, 1);
    }
    else{
      this.currentFilters.push(event.detail);
    }
    this.setState({
      filteredWorkouts: this.handleFilter(this.state.allWorkouts, this.currentFilters),
      workoutsShown: []
    });
  }

  // Currently OR filter, NEEDS to be moved to AND
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
}

export default WorkoutBody;
