import React, { Component } from 'react';
import './App.css';


function InputCity(props) {
    return (
      <div>
        <input type="type" onChange={ props.onChange }></input>
      </div>
    )
}

function City (props) {
    return (
      <div>
        <h1> {props.state} </h1>
        <ul>
          <li> {props.city} </li>
          <li> {props.population} </li>
        </ul>
      </div>
    )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityZipCodes: [],
      cityData: [],
    }
  
    this.handleChange = this.handleChange.bind(this);
  
  }

  handleChange(event) {
    const city = event.target.value;
    const url = 'http://ctp-zip-api.herokuapp.com/city/' + city.toUpperCase();
    let urlZip = 'http://ctp-zip-api.herokuapp.com/zip/';
    let holdArr = [];
    fetch(url)
      .then(response => response.json())
      .then(json => {
              this.setState({
                cityZipCodes: json,
              })    
              for (let i = 0; i < this.state.cityZipCodes.length; i++){
                let currUrl = urlZip + this.state.cityZipCodes[i];
                fetch(currUrl)
                  .then(res => res.json())
                  .then(data => {
                    for(let j = 0; j < data.length; j++){
                      holdArr.push(data[i]);
                    }
                  })
              }
      })
      .catch(errors => console.log("human error!", errors));
    console.log(holdArr);
    
  }
  
  
  
  render () {
    const cityArray = [];
    for (let i = 0; i < this.state.cityData.length; i++) {
      let curr = this.state.cityData[i];
      cityArray.push(
        <City 
          city={curr['City']}
          state={ curr['State']}
          population= { curr['Population']}
        />
      )
    }
    return (
      <div>
        <InputCity onChange={ (e) => this.handleChange(e) } />
        <p> { cityArray }</p>

      </div>
    );
  }
    
 
}

export default App;
