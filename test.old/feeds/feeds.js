const expect = require("chai").expect;
const app = require("../../app");
const request = require('supertest');
const url = '/api/v1/feed';
//const mockData = require('../utils/articleDummy');
//const commentDummy = require('../utils/commentDummy');
//const db = require('../../database');

const userCredentials = {
  email: 'admin@example.com', 
  password: '123456'
}

before(function(done){
  request(app)
    .post('/api/v1/auth/signin')
    .send(userCredentials)
    .end(function(err, response){
       // console.log(response)
       token = 'Bearer ' + response.body.data.token
      expect(response.statusCode).to.equal(200);
      done();
    });
});

describe('Fetch both articles and gifs /feed', () => {
	it('it should return response status 200', (done) => {
		request(app).get(url)
			.set('Authorization', token)
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.include.keys('data');
        done();
			})
	});
});