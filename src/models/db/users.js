const db = require('./db')

const getAllUsers = function() {
  return db.query(`
  SELECT * from users`)
}