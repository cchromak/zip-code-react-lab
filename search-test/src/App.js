import React, { Component } from 'react';
import './App.css';

function InputCity(props) {
  return(
    <div>
      Enter a city name<input onChange= { props.onChange }></input>
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
      cityName: "",
      zipsArray: [],
      cityArray: [],
    }
  };

  handleCityName(event) {

    let currName = event.target.value.toUpperCase();
    let cityUrl= "http://ctp-zip-api.herokuapp.com/city/" + currName;
    
    
    const promiseZips = fetch(cityUrl)
      .then(response => response.json())
      .then(json => {
        this.setState({
          zipsArray: json,
        })
        return this.state.zipsArray;
      })
    .catch(this.setState({
      zipsArray: [],
    }));

  
    promiseZips.then(value => {
        for(let i = 0; i < value.length; i++) {
          let zipUrl = "http://ctp-zip-api.herokuapp.com/zip/" + value[i];
          fetch(zipUrl)
          .then(response => response.json())
          .then(json => {
            let holdArray = this.state.cityArray.concat(json);
            this.setState({
              cityArray: holdArray,
           })
          })
        }
    })
   }

  render() {
    let cityDisplay =[];
    for (let i = 0; i < this.state.cityArray.length; i++) {
      let cityHold = this.state.cityArray;
      cityDisplay.push(
        <City
        name={ cityHold[i]['City'] + ", " + cityHold[i]['State'] }
        state={ cityHold[i]['State'] }
        population={ cityHold[i]['EstimatedPopulation'] }
        location={ cityHold[i]['Lat'] + ", " + cityHold[i]['Long'] }
        totalwages= {cityHold[i]['TotalWages'] }
        />
      )
    }
    return (
      <div>
        <InputCity onChange={ (e) => this.handleCityName(e) } />
        <p> { cityDisplay } </p>
      </div>
    )
  }
}


export default App;
