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

    const promiseTwo = promiseZips.then(value => {
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
    
    promiseTwo.then(console.log(this.state.cityArray))
   
    
    // let allZipCodes = this.state.zipsArray;
    // console.log(allZipCodes);
    // for (let i = 0; i < allZipCodes.length; i++) {
    //   let zipUrl = "http://ctp-zip-api.herokuapp.com/zip/" + allZipCodes[i];
    //   fetch(zipUrl)
    //     .then(response => response.json())
    //     .then(json => {
    //       let holdArray = this.state.cityArray.concat(json);
    //       this.setState({
    //         cityArray: holdArray,
    //       })
    //     })
    //   console.log(zipUrl);
    // }

    // Promise.all([promiseZips]).then(values => {
    //   console.log(values)
    //   fetch(zipUrl + values)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    // });
   }

  render() {
    return (
      <div>
        <InputCity onChange={ (e) => this.handleCityName(e) } />
    
      </div>
    )
  }
}
  //  <p> { this.state.cityArray } </p>

export default App;
