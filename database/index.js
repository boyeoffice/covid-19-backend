const { Pool } = require('pg');
// your credentials
DATABASE_URL = 'postgres://behfpwvq:kwXCV5-tE9SXflcGj2ZkxegU68RJJdOr@raja.db.elephantsql.com:5432/behfpwvq';

const pool = new Pool({
  connectionString: DATABASE_URL
});

// a generic query, that executes all queries you send to it
function query(data, value) {
  return new Promise((resolve, reject) => {
    pool
      .query(data, value)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
module.exports = {query}