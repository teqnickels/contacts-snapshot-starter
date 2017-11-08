const router = require('express').Router();
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');
const bodyParser = require('body-parser')
const authRoutes = require('./auth')

const createUser = require('../../models/db/signup')
const bcrypt = require('bcrypt')
const findMatchingUser = require('../../models/db/login')



router.get('/', (request, response, next) => {
  let {role} = request.session
  if(!request.session.role) {
    response.redirect('/login')
  } else {
    contacts.findAll()
      .then((contacts) => {response.render('contacts/index', { contacts, role })}) //passing into the response obj
      .catch( error => next(error) )
    }
  })



// router.get('/signup', (request, response) => {
//   console.log(request.session)
//   response.render('auth/signup')

// })


// router.post('/signup', (request, response) => {
//   const email = request.body.email
//   const password = request.body.password  
//   const saltRounds = 10

//     bcrypt.genSalt(saltRounds, function(err, salt) {
//       bcrypt.hash(password, salt, function(err, hash) {
//       checkIfUserExists(email)
//       .then((results) => {
//         if (!results) {
//           createUser(email, hash)
//             .then(() => {
//               response.redirect('/login')
//             })
//         } else {
//           response.send('Unable to sign up. User already exists. Hit the back button and create a new account or login.')
//           response.redirect('auth/login')
//         }
//       })
//     })
//   })
// })

// const checkIfUserExists = (email) => {
//   return findMatchingUser(email)
//     .then((results) => {
//       if (results.length < 1) {
//         return false
//       } else {
//         let listString = JSON.stringify(results)
//         let listObject = JSON.parse(listString)
//           for(let i = 0; i < listObject.length; i++) {
//             if (email === listObject[i].email) {
//               return true
//             } else {
//               return false
//             }
//           }
//       }
//     }) 
// }

// router.get('/login', (request, response) => {
//   response.render('auth/login', { message:null, warning:null  })
// })

// router.post('/login', (request, response) => {
//   const email = request.body.email
//   const loginAttempt = request.body.password
  
//   return findMatchingUser(email)
//   .then((results) => {
//     hash = results[0].password
//     let role = results[0].role
//       bcrypt.compare(loginAttempt, hash, (err, res) => {
//         if(res) {
//           request.session.email = email
//           request.session.role = role
//           console.log('THE SESSION!!!!',request.session.email, request.session.role)
//           response.redirect('/')
//         } else {
//           response.send('Wrong username or password. Click the back arrow to try again.')
//         }
//       }); 
//     }) 
// })

router.use('/contacts', contactsRoutes);
router.use('/', authRoutes)
router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)
module.exports = router;
