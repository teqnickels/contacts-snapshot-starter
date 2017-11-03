const db = require('./db')

const findMatchingUser = function(email) {
  console.log("CHECKING TO SEE IF USER EXISTS")
  return db.query(`SELECT email, password, role FROM users WHERE email=$1`, [email])
  pgp.end()
}


module.exports = findMatchingUser