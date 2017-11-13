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
  if(request.session.email) {
    contacts.findAll()
      .then((contacts) => { 
        console.log('RESPONSE STUFF====>', response.locals) 
        response.render('contacts/index', { contacts }) })

      .catch(error => next(error))
  } else {
    response.redirect('/login')
  }
})



router.use('/contacts', contactsRoutes);
router.use('/', authRoutes)
router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)
module.exports = router;
