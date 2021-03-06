import React, { Component } from 'react';

import './App.css';

function InputZip(props) {
  return (
    <div>
      <input className="input-box" type="text" onChange={ props.zip }></input>
    </div>
  )
}

function City(props) {
  return (
    <div className="city-box-centered">
      <h3> { props.name }</h3>
      <ul>
        <li>State: { props.state }</li>
        <li>Location: { props.location } </li>
        <li>Population: { props.population }</li>
        <li>Total Wages: { props.totalwages }</li>
      </ul>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let zipCode = event.target.value;
    if (zipCode.length === 5) {
      let url = 'http://ctp-zip-api.herokuapp.com/zip/' + zipCode;
      fetch(url)
        .then(response => response.json())
        .then(json => {
          this.setState({
            cities: json,
          })
        })
    } else {
      this.setState({
        cities: [],
      })
    }
  }


  render() {
    let cityArray = this.state.cities;
    let cityDisplay = [];
    for (let i = 0; i < cityArray.length; i++) {
      cityDisplay.push(
        <City 
        name={ cityArray[i]['City'] + ", " + cityArray[i]['State'] }
        state={ cityArray[i]['State'] }
        population={ cityArray[i]['EstimatedPopulation'] }
        location={ cityArray[i]['Lat'] + ", " + cityArray[i]['Long'] }
        totalwages= {cityArray[i]['TotalWages'] }
        />
      )
    }
    return (
      <div className="col-centered">
        <InputZip zip={(e) => this.handleChange(e)} />
        <p> { cityDisplay.length === 0 ? "Please enter a zip code" : cityDisplay }</p>
      </div>
    )
  }
}

export default App;
