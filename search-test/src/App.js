import React, { Component } from 'react';

import './App.css';

function InputZip(props) {
  return (
    <div>
      <input type="text" onChange={ props.zip }></input>
    </div>
  )
}

function City(props) {
  return (
    <div>
      <ul>
        <li>Name: { props.city }</li>
        <li>Population: { props.population }</li>
        <li>Location: { props.location } </li>
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
        city={ cityArray[i]['City']}
        population={ cityArray[i]['EstimatedPopulation']}
        location={ cityArray[i]['Lat'] + ", " + cityArray[i]['Long']}
        />
      )
    }
    return (
      <div>
        <InputZip zip={(e) => this.handleChange(e)} />
        <p> { cityDisplay.length === 0 ? "Please enter a zip code" : cityDisplay }</p>
      </div>
    )
  }
}

export default App;
