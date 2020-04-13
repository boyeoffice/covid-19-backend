const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to my app',
  });
});

module.exports = app;
