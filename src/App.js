import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import Navigation from './components/Navigation'
import Landing from './components/Landing'
import Predict from './components/Predict'
import About from './components/About'
import Check from './components/Check'
import Error from './components/Error'

class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <div>

        <Navigation />
          <Switch>
            <Route path='/' component={Landing} exact />
            <Route path='/predict' component={Predict} />
            <Route path='/check' component={Check} />
            <Route path='/about' component={About} />
            <Route component={Error} />
          </Switch>
        </div>

      </BrowserRouter>
    )

  }
}

export default App;
