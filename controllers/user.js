const Users = require('../models/user');
const db = require('../database');

const Lo = async (email) =>{
	const ress = await db.query(Users.findByEmail(email))
	console.log(ress.rows)
}
Lo()

