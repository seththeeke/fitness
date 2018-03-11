import React, { Component } from 'react';
import './App.css';
import PoweredByReact from './PoweredByReact';
import WorkoutBody from './WorkoutBody';
import Menu from './Menu';
import Home from './Home';

class App extends Component {
  constructor(){
    super();
    
    // Read in Workouts JSON
    // this.workouts = require('./workouts.json');
    this.state = {
        workouts: []
    }

    // Must bind this to functions before adding event listeners
    // or refs is undefined
    this._navHome = this._navHome.bind(this);
    this._navToWorkouts = this._navToWorkouts.bind(this);

    // Navigation Event Listeners
    document.addEventListener("nav-home", this._navHome);
    document.addEventListener("nav-workouts", this._navToWorkouts);
  }

  componentDidMount() {
    let URL = 'https://cln96umwkb.execute-api.us-east-1.amazonaws.com/dev';
       fetch(URL)
       .then(res => res.json())
       .then((result) => {
          this.setState({
             workouts: result
          });
       })
   }

  render() {
    return (
      <div className="App">
        <PoweredByReact></PoweredByReact>
        <Menu></Menu>
        <div ref="home">
          <Home></Home>
        </div>
        <div ref="workouts" hidden>
          <WorkoutBody workouts={this.state.workouts}></WorkoutBody>
        </div>
      </div>
    );
  }

  shouldComponentUpdate (nextProps, nextState){
    // HACK(I think) if I didn't set the state variable specifically,
    // the item would not update
    this.state.workouts = nextProps.workouts;
    console.log("UPDATE APP");
    return true;
  }

  _navHome(){
    this.refs.home.hidden = false;
    this.refs.workouts.hidden = true;
  }

  _navToWorkouts(){
    this.refs.home.hidden = true;
    this.refs.workouts.hidden = false;
  }
}

export default App;
