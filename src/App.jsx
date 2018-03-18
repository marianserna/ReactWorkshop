import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Home from './pages/Home';
import City from './pages/City';

import UiStore from './stores/UiStore';
import WeatherStore from './stores/WeatherStore';

export default class App extends React.Component {
  render() {
    return (
      <Provider UiStore={UiStore} WeatherStore={WeatherStore}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:city" exact component={City} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
