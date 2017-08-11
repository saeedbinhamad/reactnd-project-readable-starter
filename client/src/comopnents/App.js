/* This view should list all available categories, which should link to a category view for that category
should list all of the posts ordered by voteScore (highest score first)
should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
should have a control for adding a new post */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
