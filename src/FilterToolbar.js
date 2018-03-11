import React, { Component } from 'react';
import './FilterToolbar.css';

class FilterToolbar extends Component {
  constructor(properties){
    super();

    let typeFilters = [];
    let targetFilters = [];
    let muscleFilters = [];
    this.setUpSeparateFilters(properties.allWorkouts, typeFilters, targetFilters, muscleFilters);

    this.state = {
      typeFilters: typeFilters,
      targetFilters: targetFilters,
      muscleFilters: muscleFilters
    }

    this.filter = this.filter.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState){
    // HACK(I think) if I didn't set the state variable specifically,
    // the item would not update
    console.log("UPDATE Filter Toolbar");
    console.log(nextProps);
    let typeFilters = [];
    let targetFilters = [];
    let muscleFilters = [];
    this.setUpSeparateFilters(nextProps.allWorkouts, typeFilters, targetFilters, muscleFilters);

    this.state = {
      typeFilters: typeFilters,
      targetFilters: targetFilters,
      muscleFilters: muscleFilters
    }
    return true;
  }

  /*
  * Sets up an array of possible filters that will
  * be rendered as checkboxes
  */
  setUpSeparateFilters (workouts, typeFilters, targetFilters, muscleFilters){
    for (let i = 0; i < workouts.length; i++){
      let workout = workouts[i];
      this.addPropertyToFilter(typeFilters, workout.type);
      this.addPropertyToFilter(targetFilters, workout.target);
      let exercises = workout.exercises;
      for (let i = 0; i < exercises.length; i++){
        let exercise = exercises[i];
        this.addPropertyToFilter(muscleFilters, exercise.main_muscle_group);
        this.addPropertyToFilter(muscleFilters, exercise.secondary_muscle_groups, true);
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

  setUpFiltersObject (filtersArray){
    let filterBlock = [];
    let filtersObject = [];
    let count = 0;
    for (let i = 0; i < filtersArray.length; i++){
      let filter;
      let object = filtersArray[i];
      filter = (
        <div className="input filter">
          <input id="{object}" type="checkbox" className="filter-checkbox" onClick={() => this.filter({object})}></input>
          <label for="{object}">{object}</label>
        </div>
      );
      filterBlock.push(filter);
      count++;
      if (count === 3 || (i === filtersArray.length - 1)){
        filtersObject.push(
          <div className="checkbox-wrapper">
            {filterBlock}
          </div>
        );
        filterBlock = [];
        count = 0;
      }
    }
    return filtersObject;
  }

  filter (event){
    var filterEvent = new CustomEvent("filter-workouts", {
      detail: event.object
    });
    document.dispatchEvent(filterEvent);
  }

  render() {
    // Setting up checkbox filters based on string array of filters, would like to move to separate component
    var typeFilters = this.setUpFiltersObject(this.state.typeFilters);
    var targetFilters = this.setUpFiltersObject(this.state.targetFilters);
    var muscleFilters = this.setUpFiltersObject(this.state.muscleFilters);

    return (
      <div className="filter-toolbar">
          <div className="type-filters-wrapper border">
            <h2>Type</h2>
            {typeFilters}
          </div>
          <div className="filters-wrapper border">
            <h2>Target</h2>
            {targetFilters}
          </div>
          <div className="filters-wrapper">
            <h2>Muscle Group</h2>
            {muscleFilters}
          </div>
      </div>
    );
  }

}

export default FilterToolbar;
