const db = require('./db')

// const whatIsYourRole = function(currentUser) {
//   return db.query(`
//   SELECT role FROM users WHERE email = $1`, [currentUser])
// }

const showAllUsers = function() {
  return db.query(`SELECT * from users RETURNING *`)
}