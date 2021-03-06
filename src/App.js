import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Homepage from './containers/Homepage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={ Homepage } />
        </div>
      </Router>
    );
  }
}

export default App;
