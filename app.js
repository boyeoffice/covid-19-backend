const express = require('express');
const cors = require('cors');

const EstimateController = require('./controllers/estimateController');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to my app'
  });
});

app.post('/api/v1/on-covid-19', EstimateController.estimatorJson);

// app.post('/api/v1/on-covid-19/json', EstimateController.estimator);

module.exports = app;
