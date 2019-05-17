import React from 'react';
import axios from 'axios';

// tell axios where to find the api
axios.defaults.baseURL = 'http://localhost:3300/api';


axios.interceptors.request.use(
  function(options) {
    
    options.headers.authorization = localStorage.getItem('jwt'); //
    
    return options; 
  },
  function(error) {
    // do something with the error
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('jwt');

      const notLoggedIn = <div>Please login to see the users</div>;
      // if there is no token, then show a message to the user

      return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
    }
  }
}