import React from 'react';
import axios from 'axios';

import Nav from '../components/Nav';
import Temperature from '../components/Temperature';
import Time from '../components/Time';
import Today from '../components/Today';
import Daily from '../components/Daily';
// import Chat from "../components/Chat";

import {
  Loading, // small div to wrap text when loading data
  CityContainer, // wraps the entire content in this component
  CityBackground, // displays a background image covering whole page
  Forecast // Wrapper for when showing the Daily components
} from '../elements/city';

export default class City extends React.Component {
  state = {
    weather: null,
    time: new Date().toISOString(),
    weatherError: false
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date().toISOString()
      });
    }, 1000);

    this.fetchWeather();
  }

  fetchWeather = async () => {
    try {
      const response = await axios.get(
        'https://abnormal-weather-api.herokuapp.com/cities/search',
        {
          params: { city: this.props.match.params.city }
        }
      );

      this.setState({
        weather: response.data
      });
    } catch (error) {
      this.setState({
        weatherError: true
      });
    }
  };

  render() {
    const { weather, time, weatherError } = this.state;

    if (weatherError) {
      return <Loading>Sorry, something went wrong! 🤨</Loading>;
    }

    {
      if (!this.state.weather) {
        return <Loading>Loading...</Loading>;
      }
    }
    return (
      <CityContainer>
        <CityBackground
          style={{ backgroundImage: `url('${weather.image_url}')` }}
        />
        <Nav city={weather.city} />
        <Temperature temp={weather.current.temp} city={weather.city} />
        <Time time={time} />
        <Today date={weather.current.date} />

        <Forecast>
          {weather.forecast.map(daily => <Daily {...daily} key={daily.date} />)}
        </Forecast>
      </CityContainer>
    );
  }
}
