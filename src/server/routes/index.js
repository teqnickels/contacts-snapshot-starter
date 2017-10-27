const router = require('express').Router();
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');
const bodyParser = require('body-parser')
const session = require('express-session')
const createUser = require('../../models/db/signup')
const bcrypt = require('bcrypt')
const findMatchingUser = require('../../models/db/login')

router.get('/', (request, response, next) => {
  contacts.findAll()
    .then((contacts) => {response.render('contacts/index', { contacts })})
    .catch( error => next(error) )
})

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/signup', (request, response) => {
  response.render('auth/signup')
})

router.post('/signup', (request, response) => {
  const email = request.body.email
  const password = request.body.password
  const saltRounds = 10
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
      checkIfUserExists(email)
      .then((results) => {
        console.log("userExists", results)
        if (!results) {
          createUser(email, hash)
            .then(() => {
              response.redirect('/login')
            })
        } else {
          response.render('auth/login', { message: 'This user already exists. Login with your username and password' } )
        }
      })
    })
  })
})

const checkIfUserExists = (email) => {
  return findMatchingUser(email)
    .then((results) => {
      console.log("RESULTS!!!!!", results)
      if (results.length < 1) {
        return false
      } else {
        let listString = JSON.stringify(results)
        let listObject = JSON.parse(listString)
          for(let i = 0; i < listObject.length; i++) {
            if (email === listObject[i].email) {
              return true
            } else {
              return false
            }
          }
      }
    }) 
}

router.get('/login', (request, response) => {
  response.render('auth/login', { message:null })
})

router.post('/login', (request, response) => {
  const email = request.body.email
  const loginAttempt = request.body.password
  findMatchingUser(email, loginAttempt)
    .then((results) => {
      console.log("RESULTS FROM DATABASE PROMISE", results)
      if(results.length === 0) {
        response.redirect('/login')
      } else {
       const match = validatePassword(loginAttempt, results)
       console.log('MATCH RESULTS index.js 83 =====>', match)
       if (!match) {
         response.redirect('/login')
       }
       if(match) {
         response.redirect('/')
       } 
      }
    })
})

const validatePassword = (loginAttempt, passwordFromDB) => {
  console.log('LOGIN ATTEMPT & PASSWORD FROM DATABASE =====>', loginAttempt, passwordFromDB)

  if(loginAttempt === passwordFromDB) {
    return true
  }else {
    return false
  }
}

router.use('/contacts', contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

// router.use(session())
module.exports = router;
