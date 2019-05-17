import React from 'react';
import axios from 'axios';

//lets use that HoC

import requiresAuth from '../auth/requiresAuth';

class Jokes extends React.Component {
  state = {
    // loggedIn: false,
    jokes: [],
  };

  render() {
    return (
      <> 
        <h2>List of Jokes</h2>

        <ul>
          {this.state.jokes.map(jokes => (
            <li key={jokes.id}>{jokes.joke}</li>
          ))}
        </ul>
      </>
    )
  }

  componentDidMount() {
    axios.get('/jokes')
    .then(res => {
      this.setState({ jokes: res.data });
    })
  }

}

export default requiresAuth(Jokes);