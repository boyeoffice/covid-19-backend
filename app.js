const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const EstimateController = require('./controllers/estimateController');
const LogsController = require('./controllers/logsController');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny', {
  stream: fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' })
}));

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to my app'
  });
});

app.post('/api/v1/on-covid-19', EstimateController.estimatorJson);
app.get('/api/v1/on-covid-19/logs', LogsController.logResponse);

// app.post('/api/v1/on-covid-19/json', EstimateController.estimator);

module.exports = app;
