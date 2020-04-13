const expect = require("chai").expect;
const app = require("../app");
const request = require('supertest');

describe('Test server /index', () => {
	it('should return response status 200', (done) => {
		request(app).get('/')
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.include.keys('message');
				 expect(res.body.message).to.equal('Welcome to teamwork project');
				 done()
			})
			.catch((err) => console.log(err))
	});
});

describe('Unauthorized /create-user', () => {
	it('should return response status 401', (done) => {
		request(app).post('/api/v1/auth/create-user')
			.then((res) => {
				expect(res.statusCode).to.equal(401);
				 expect(res.body.status).to.equal('error');
				 expect(res.body.msg).to.equal('Unauthorized');
				 done()
			})
			.catch((err) => console.log(err))
	});
});

describe('Invalid user id /create-user', () => {
	it('should return response status 401', (done) => {
		request(app).post('/api/v1/auth/create-user')
			.send({userId: 1})
			.set('accept', 'application/json')
      .set('Authorization', 'Bearer ywghoyfsihu6ioh4uojlsgufsgohguwhle')
			.then((res) => {
				expect(res.statusCode).to.equal(401);
				//expect(res.body.status).to.equal('error');
				//expect(res.body.msg).to.equal('Invalid user id');
				 done()
			})
			.catch((err) => console.log(err))
	});
});