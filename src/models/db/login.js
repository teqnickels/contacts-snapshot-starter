const db = require('./db')

const findMatchingUser = function(email) {
  return db.query(`SELECT email FROM auth WHERE email=$1`, [email])
  pgp.end()
}


module.exports = findMatchingUser