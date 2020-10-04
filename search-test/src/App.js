import React, { Component } from 'react';
import './App.css';

function InputCity(props) {
  return(
    <div>
      Enter a city name<input onChange= { props.onChange }></input>
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
    let zipUrl = "http://ctp-zip-api.herokuapp.com/zip/";
    let promiseZips = fetch(cityUrl)
      .then(response => response.json())
      .then(json => {
        this.setState({
          zipsArray: json,
        })
      })
    .catch(this.setState({
      zipsArray: [],
    }));
    
    
    let allZipCodes = this.state.zipsArray;
    for (let i = 0; i < allZipCodes.length; i++) {
      let zipUrl = "http://ctp-zip-api.herokuapp.com/zip/" + allZipCodes[i];
      fetch(zipUrl)
        .then(response => response.json())
        .then(json => {
          this.setState({
            cityArray: this.state.cityArray.push(json),
          })
        })
      console.log(zipUrl);
    }

  //   Promise.all([promiseZips]).then(values =>
  //     console.log(values))
  //     fetch(zipUrl + values)
  //     .then(response => response.json())
  //     .then(data => console.log(data)));
   }

  render() {
    return (
      <div>
        <InputCity onChange={ (e) => this.handleCityName(e) } />
        <p> { this.state.cityArray } </p>
      </div>
    )
  }
}


export default App;
