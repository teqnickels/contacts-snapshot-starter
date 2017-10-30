const db = require('./db')

const findMatchingUser = function(email) {
  console.log("MADE IT TO DB")
  return db.query(`SELECT email, password FROM auth WHERE email=$1`, [email])
  pgp.end()
}


module.exports = findMatchingUser