const expect = require("chai").expect;
const app = require("../../app");
const request = require('supertest');
const url = '/api/v1/category';
const mockData = require('../utils/categoryDummy');
const db = require('../../database');
let token;
let categoryId;
const { emptyData, validData } = mockData.category;

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

describe('Fetch all categories /category', () => {
	it('should return response status 200', (done) => {
		request(app).get(url)
			.set('Authorization', token)
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.include.keys('data');
				done();
			});
	});
});

describe('Try to submit empty form /category', () => {
	it('it should return response status 422', (done) => {
		request(app).post(url)
			.send({...emptyData})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				expect(res.statusCode).to.equal(422);
				expect(res.body).to.include.keys('error');
        done();
			})
	});
});

describe('Try to submit valid form /category', () => {
	it('it should return response status 201', (done) => {
		request(app).post(url)
			.send({...validData})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				categoryId = '/api/v1/category/' + res.body.data.categoryId
				expect(res.statusCode).to.equal(201);
				expect(res.body).to.include.keys('data');
        done();
			})
	});
});
describe('Try to submit valid form /category', () => {
	it('it should return response status 422', (done) => {
		request(app).post(url)
			.send({...validData})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
			//	categoryId = '/v1/category/' + res.body.data.categoryId
				expect(res.statusCode).to.equal(422);
				expect(res.body).to.include.keys('error');
        done();
			})
	});
});

describe('Fetch single category /category', () => {
	it('should return response status 200', (done) => {
		request(app).get(categoryId)
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(categoryId)
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.include.keys('data');
        done();
			});
	});
});

describe('Fetch single category /category', () => {
	it('should return response status 404', (done) => {
		request(app).get('/api/v1/category/45')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(categoryId)
				expect(res.statusCode).to.equal(404);
				expect(res.body).to.include.keys('error');
        done();
			});
	});
});

describe('Update category /category', () => {
	it('it should return response status 201', (done) => {
		request(app).patch(categoryId)
			.send({...validData})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(201);
				expect(res.body).to.include.keys('data');
        done();
			})
	});
});

describe('Update category /category', () => {
	it('it should return response status 404', (done) => {
		request(app).patch('/api/v1/category/49')
			.send({...validData})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(404);
				expect(res.body).to.include.keys('error');
        done();
			})
	});
});

describe('Delete category /category', () => {
	it('it should return response status 201', (done) => {
		request(app).delete(categoryId)
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(202);
				expect(res.body).to.include.keys('msg');
        done();
			});
	});
});