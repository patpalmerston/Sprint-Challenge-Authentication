const axios = require('axios');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const { authenticate, generateToken } = require('../auth/authenticate');
const db = require('../database/dbConfig');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db('users')
    .insert(user)
    .then(ids => {
      res.status().json(user)
    })
    .catch(err => {
      res.status(401).json({message: err})
    })
}

function login(req, res) {
  let info = req.body;

  db('users')
    .where({ username: info.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(info.password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error)
    });
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
