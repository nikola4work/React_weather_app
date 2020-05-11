import React from "react";
import "./App.css";

import Weather from "./component/weather.component"
import "bootstrap/dist/css/bootstrap.min.css";
import 'weather-icons/css/weather-icons.css'
import { Component } from "react";

// http://api.openweathermap.org/daa/2.5/weather?q=London,uk
const API_key = "12be9dca0b918a1415beaa5a35fab8fd";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city:undefined,
      country:undefined
    }
    this.getWeather();
  }

  getWeather = async()=>{
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`)

{/**CONVERT DATA TO JSON FILE */}
const response = await api_call.json();
console.log(response)

this.setState({
  city:response.name,
  country:response.sys.country
})
  }

  render(){
    return(
      <div className="App">
        <Weather city={this.state.city} country={this.state.country} />
      </div>
    )
  }
}



export default App;
