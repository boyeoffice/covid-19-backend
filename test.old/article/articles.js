const expect = require("chai").expect;
const app = require("../../app");
const request = require('supertest');
const url = '/api/v1/articles';
const mockData = require('../utils/articleDummy');
const commentDummy = require('../utils/commentDummy');
const db = require('../../database');
let token;
let articleId;
let gifId
let commentId
const { emptyData, validData } = mockData.articles;
const { emptyComment, validComment } = commentDummy.comments;

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

describe('Try to submit empty form /articles', () => {
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

describe('Try to submit valid form /articles', () => {
	it('it should return response status 201', (done) => {
		request(app).post(url)
			.send({...validData})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				articleId = '/api/v1/articles/' + res.body.data.articleId
				gifId = '/api/v1/gifs/' + res.body.data.articleId
				expect(res.statusCode).to.equal(201);
				expect(res.body).to.include.keys('data');
        done();
			})
	});
});

describe('Fetch all articles /articles', () => {
	it('it should return response status 200', (done) => {
		request(app).get(url)
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.include.keys('data');
        done();
			})
	});
});

describe('Fetch single article /articles', () => {
	it('it should return response status 200', (done) => {
		request(app).get(articleId)
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.include.keys('data');
        done();
			})
	});
});

describe('Fetch single article /articles', () => {
	it('it should return response status 404', (done) => {
		request(app).get('/api/v1/articles/56')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(404);
				expect(res.body).to.include.keys('error');
        done();
			})
	});
});

describe('Try submit empty comment /:articleId/comment', () => {
	it('should return response 422', (done) => {
		request(app).post(articleId + '/comment')
			.send({...emptyComment})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				expect(res.statusCode).to.equal(422);
				expect(res.body).to.include.keys('error');
        done();
			});
	});
});

describe('Try submit empty comment /:gifId/comment', () => {
	it('should return response 422', (done) => {
		request(app).post(gifId + '/comment')
			.send({...emptyComment})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				expect(res.statusCode).to.equal(422);
				expect(res.body).to.include.keys('error');
        done();
			});
	});
});

describe('Article not found to comment on', () => {
	it('should return response 404', (done) => {
		request(app).post('/api/v1/articles/34/comment')
			.send({...validComment})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(404);
				expect(res.body).to.include.keys('error');
        done();
			});
	});
});

	describe('Gif not found to comment on', () => {
	it('should return response 404', (done) => {
		request(app).post('/api/v1/gifs/34/comment')
			.send({...validComment})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(404);
				expect(res.body).to.include.keys('error');
        done();
			});
	});
});

describe('Comment on article', () => {
	it('should return response 201', (done) => {
		request(app).post(articleId + '/comment')
			.send({...validComment})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				commentId = '/api/v1/comment/' + res.body.data.commentId
				expect(res.statusCode).to.equal(201);
				expect(res.body).to.include.keys('data');
        done();
			});
	});
});

describe('Comment on gif', () => {
	it('should return response 201', (done) => {
		request(app).post(gifId + '/comment')
			.send({...validComment})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
			//	console.log(res.body)
				expect(res.statusCode).to.equal(201);
				expect(res.body).to.include.keys('data');
        done();
			});
	});
});

describe('Try to Flag empty comment', () => {
	it('should return response 201', (done) => {
		request(app).patch('/api/v1/comment/45/flag')
			.send({status: 0})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
			//	console.log(res.body)
				expect(res.statusCode).to.equal(404);
				expect(res.body).to.include.keys('error');
        done();
			});
	});
});

describe('Flag comment', () => {
	it('should return response 201', (done) => {
		request(app).patch(commentId + '/flag')
			.send({status: 0})
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
			//	console.log(res.body)
				expect(res.statusCode).to.equal(201);
				expect(res.body).to.include.keys('status');
        done();
			});
	});
});

describe('Try to Delete empty comment', () => {
	it('should return response 404', (done) => {
		request(app).delete('/api/v1/comment/45')
			.set('Authorization', token)
			.end((err, res) => {
			//	console.log(res.body)
				expect(res.statusCode).to.equal(404);
				expect(res.body).to.include.keys('error');
        done();
			});
	});
});

describe('Delete comment', () => {
	it('should return response 202', (done) => {
		request(app).delete(commentId)
			.set('Authorization', token)
			.end((err, res) => {
			//	console.log(res.body)
				expect(res.statusCode).to.equal(202);
				expect(res.body).to.include.keys('status');
        done();
			});
	});
});

describe('Update single article /articles', () => {
	it('it should return response status 201', (done) => {
		request(app).patch(articleId)
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

describe('Delete single article /articles', () => {
	it('it should return response status 202', (done) => {
		request(app).delete(articleId)
			.set('accept', 'application/json')
			.set('Authorization', token)
			.end((err, res) => {
				//console.log(res.body)
				expect(res.statusCode).to.equal(202);
				expect(res.body).to.include.keys('status');
        done();
			})
	});
});