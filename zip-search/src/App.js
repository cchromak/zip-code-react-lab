import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div >
    <ul>
      <li>State: {props.state}</li>
      <li>Location: {props.location}</li>
      <li>Population: {props.city}</li>
    </ul>
  </div>
  );
}

function ZipSearchField(props) {
  return (
  <div>
    Enter a Zip code:
    <input type="text" onChange={ props.onChange } />
    <p>You entered: </p>
  </div>);
}


//onchange e target returns value in input to console // onChange={(e) => console.log(e.target.value)}


class App extends Component {

  state = {
    userInputValue: "",
    cities: [],
  }

  handleZipChange(event) {
    let url = 'http://ctp-zip-api.herokuapp.com/zip/' + event.target.value;
    console.log(event.target.value);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          cities: json,
        })
      })
  }


  // create an array of <City /> elements,

  render() {
    const data = this.state.cities;
    const dataArray = [];
    for(let i = 0; i < data.length; i++) {
      const curr = data[i];
      dataArray.push(
        <City
        city={curr['City']}
        state={curr["State"]}
        location={curr['Lat'] + ", " + curr['Long']}
        />
      )
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onChange={(e) => this.handleZipChange(e)}/>
        <div>
          {dataArray}
        </div>
      </div>
    );
  }
}

export default App;
