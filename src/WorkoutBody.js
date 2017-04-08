import React, { Component } from 'react';
import './WorkoutBody.css';

class WorkoutBody extends Component {
  constructor(properties){
    super();
    console.log(properties.workouts);

    // required to bind funcion to dom
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event){
    console.log("Hello");
  }

  render() {
    var filter = [1, 2, 3, 4, 5];
    var filters = filter.map((filter) =>
      <div>
      <input id="male" type="checkbox"></input>
      <label for="male">{filter}</label>
      </div>
    );

    return (
      <div>
        <div className="filter-toolbar">
            {filters}
        </div>
        <div>
          Dummy Block
        </div>
      </div>
    );
  }
}

export default WorkoutBody;
