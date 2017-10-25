const router = require('express').Router();
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');
const bodyParser = require('body-parser')
const session = require('express-session')
const createUser = require('../../models/db/signup')

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

  createUser(email, password)
    .then(() => {
        response.render('auth/login')
      })
    })

router.use('/contacts', contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

// router.use(session())
module.exports = router;
