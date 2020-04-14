const fs = require('fs');
const { promisify } = require('util');
const path = require('path');


exports.logResponse = async (req, res) => {
  const data = await promisify(fs.readFile)(path.join(__dirname, '../access.log'), 'utf8');
  res.send(data);
};
