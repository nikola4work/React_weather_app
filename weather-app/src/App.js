import React from "react";
import "./App.css";

import Weather from "./component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import { Component } from "react";
import Form from "../src/component/form.component";

// http://api.openweathermap.org/daa/2.5/weather?q=London,uk
const API_key = "12be9dca0b918a1415beaa5a35fab8fd";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };

    this.weathericon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_Weathericon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weathericon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weathericon.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 521:
        this.setState({ icon: this.weathericon.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weathericon.Snow });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.weathericon.Atmosphere });
        break;
      case rangeID === 800:
        this.setState({ icon: this.weathericon.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weathericon.Clouds });
      default:
        this.setState({ icon: this.weathericon.Clouds });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      {
        /**CONVERT DATA TO JSON FILE */
      }
      const response = await api_call.json();
      console.log(response);

      this.setState({
        city: `${response.name} , ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        icon: this.weathericon.Thunderstorm,
      });

      this.get_Weathericon(this.weathericon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weathericon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
