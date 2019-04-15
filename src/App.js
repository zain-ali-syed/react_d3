import React, { Component } from 'react';
import axios from 'axios';
import LineChart from './components/LineChart';

const openWeatherURL =
  'http://api.openweathermap.org/data/2.5/forecast?&appid=655d7edbb63906a7ee38d8c8cef230f9&q=';

class App extends Component {
  state = {
    temperatures: [],
    city: [
      {
        name: 'London'
      },
      {
        name: 'Tokyo'
      },
      {
        name: 'Norilsk'
      },
      {
        name: 'Dubai'
      }
    ]
  };

  componentDidMount() {
    this.getCityData(this.state.city[0].name);
  }

  getCityData = city => {
    axios
      .get(`${openWeatherURL}${city}`)
      .then(res => this.setState({ temperatures: res.data.list }))
      .catch(err => console.log('oopsy an error ', err));
  };

  render() {
    if (!this.state.temperatures.length) return <div>Loading..</div>;
    return (
      <div className="container">
        <img src="/react-d3.png" alt="reactD3 logo" />
        <h3>
          Humidity Levels for the next 5 days (data from openweathermap.org)
        </h3>
        <p>
          This is just a barebones example showing how to set up React and D3 to
          work together.
        </p>
        <div />
        <select onChange={e => this.getCityData(e.target.value)}>
          {this.state.city.map(({ name }) => (
            <option value={name}>{name}</option>
          ))}
        </select>
        <div>
          <LineChart data={this.state.temperatures} />
        </div>
      </div>
    );
  }
}

export default App;
