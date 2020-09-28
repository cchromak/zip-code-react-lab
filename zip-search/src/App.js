import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div >
    <ul>
      <li>State: {props.state}</li>
      <li>Population: {props.city}</li>
      <li>Logintue and Latitude: {props.location}</li>
    </ul>
  </div>
  );
}

function ZipSearchField(props) {
  return (
  <div>
    Enter a Zip code:
    <input type="text" onChange={ props.onChange } />
  </div>);
}


//onchange e target returns value in input to console // onChange={(e) => console.log(e.target.value)}


class App extends Component {

  state = {
    cities: [],
  }

  handleZipChange(event) {
    
    let url = 'http://ctp-zip-api.herokuapp.com/zip/' + event.target.value;
    console.log(event.target.value);
    if (event.target.value.length !== 5) {
      this.setState ({
        cities: [],
      })
    } else {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          cities: json,
        })
      })
  }
}


  render() {
    const data = this.state.cities;
    const dataArray = [];
    
    for(let i = 0; i < data.length; i++) {
      const curr = data[i];
      dataArray.push(
        <City
        key={i}
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
        {(dataArray.length === 0) ? "Please enter a valid Zip Code" : dataArray }
        </div>
      </div>
    );
  }
}

export default App;
