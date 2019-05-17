import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Jokes from './components/Jokes';

import './App.css';


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to='/signup'>Sign Up</NavLink>
            &nbsp; | &nbsp;
            <NavLink to='/login'>Log In</NavLink>
            &nbsp; | &nbsp;
            <NavLink to='/jokes'>Jokes</NavLink>
            &nbsp; | &nbsp;
            <button onClick={this.logout}></button>
          </nav>
        </header>
      
        <main>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/jokes" component={Jokes} />
        </main>

      </div>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');

    this.props.history.push('/login');
  }

}

export default withRouter(App);
