import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Jokes from './components/Jokes';

import './App.css';


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <h1>I am the App Component</h1>
      </div>
    );
  }
}

export default App;
