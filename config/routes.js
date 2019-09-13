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
  let info = req.body;
  const hash = bcrypt.hashSync(info.password, 10);
  info.password = hash;

  db('users')
    .insert(info)
    .then(saved => {
      res.status(201).json(saved)
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
