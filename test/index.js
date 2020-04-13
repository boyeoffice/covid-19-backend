const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');

describe('Test server /index', () => {
  it('should return response status 200', (done) => {
    request(app).get('/')
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('message');
        expect(res.body.message).to.equal('Welcome to my app');
        done();
      })
      .catch((err) => console.log(err));
  });
});
