const db = require('./db')

const createUser = function(email, password) {
  return db.query(` 
    INSERT INTO auth 
    (email, password) 
    VALUES 
    ($1, $2)`, [email, password]) 
  }

module.exports = createUser