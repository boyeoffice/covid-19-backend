const expect = require("chai").expect;
const app = require("../../app");
const request = require('supertest');
const url = '/v1/gifs';
const mockData = require('../utils/categoryDummy');
const db = require('../../database');
let token;
let gifId;
//const { emptyData, validData } = mockData.category;
let filename = 'x.png'
let boundary = Math.random()
const fs = require('fs');

const userCredentials = {
  email: 'admin@example.com', 
  password: '123456'
}

before(function(done){
  request(app)
    .post('/v1/auth/signin')
    .send(userCredentials)
    .end(function(err, response){
       // console.log(response)
       token = 'Bearer ' + response.body.data.token
      expect(response.statusCode).to.equal(200);
      done();
    });
});

describe('Upload image', () => {
  it('should return response 201', () => {
    request(app)
      .post(url)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token)
      .field('title', 'This is gif')
      .attach('image', fs.readFileSync('/home/travis/build/boyeoffice/Teamwork-backend/test/assets/ad4.jpg'),
        'ad4.jpg')
      .end((err, res) => {
        //console.log(res.body)
        gifId = '/v1/gifs/' + res.body.data.gifId
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('data');
        done();
      })
  });
});

describe('Fetch all images', () => {
  it('should return response 200', () => {
    request(app)
      .get(url)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('data');
        done();
      })
  });
});

/*describe('Fetch one image', () => {
  it('should return response 200', () => {
    request(app)
      .get(gifId)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('data');
        done();
      })
  });
});*/