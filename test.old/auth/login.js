const expect = require("chai").expect;
const app = require("../../app");
const request = require('supertest');
const url = '/api/v1/auth/signin';
const mockData = require('../utils/userDummy');

const {validDetails, invalidEmail, invalidPassword} = mockData.login

describe('Test login', () => {
	it('should login a valid user', (done) => {
        request(app)
            .post(url)
            .set('accept', 'application/json')
            .send({ ...validDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.include.keys('data');
                expect(res.body.data).to.include.keys('userId');
                done(err);
            });
   });
});

describe('###Wrong Email', () => {
        it('should return error for invalid details', (done) => {
            request(app)
                .post(url)
                .set('accept', 'application/json')
                .send({ ...invalidEmail })
                .end((err, res) => {
                   // console.log(res.body)
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.include.keys('error');
                    done(err);
                });
       });
});

describe('###Wrong Password', () => {
        it('should return error for invalid details', (done) => {
            request(app)
                .post(url)
                .set('accept', 'application/json')
                .send({ ...invalidPassword })
                .end((err, res) => {
                   // console.log(res.body)
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.include.keys('error');
                    done(err);
                });
       });
});
