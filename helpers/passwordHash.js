const bcrypt = require('bcrypt');

/**
 * @function hashPassword
 * @param {string} password
 * @param {integer} salt
 * @returns
 */
const passwordHash = (password) => {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
};
module.exports = passwordHash;