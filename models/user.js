const db = require('../database');
class Users {
	findByEmail(email){
	 return `SELECT * FROM "public"."users" LIMIT 100`
	}
}
module.exports = new Users();