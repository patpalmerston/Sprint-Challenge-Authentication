import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  state = {
    username: '', 
    password: '',
  };

  render() {
    return (
      <>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <input
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    // explain how this works if needed
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // the endpoint could come from an environment variable
    // const endpoint = `${process.env.API_URL}/api/auth/login`;
    const endpoint = 'http://localhost:3300/api/register';

    axios
      .post(endpoint, this.state)
      .then(res => {
        // this is the new part, explain how localStorage works
        localStorage.setItem('jwt', res.data.token); // the server returns the token
        console.log(res)
        // add this after the Users component is wired
        this.props.history.push('/jokes');
      })
      .catch(error => console.error(error));
    // the client could show a nice toast with the error
  };
}

export default Signup;