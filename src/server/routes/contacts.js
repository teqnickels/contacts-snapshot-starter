const contacts = require('../../models/contacts')

const router = require('express').Router()

router.get('/new', (request, response) => {
  if(request.session.role === 'admin') {
    response.render('contacts/new')
  } else {
    response.sendStatus(403)
  }
})

router.post('/', (request, response, next) => {
  contacts.create(request.body)
    .then(function(contact) {
      if (contact) return response.redirect(`/contacts/${contact[0].id}`)
      next()
    })
    .catch( error => next(error) )
})

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  contacts.findById(contactId)
    .then(function(contact) {
      if (contact) return response.render('contacts/show', { contact })
      next()
    })
    .catch( error => next(error) )
})


router.delete('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (request.session.role === 'admin') {
    console.log("ID -------->", request.params.id)
    contacts.destroy(contactId)
      .then(function(contact) {
        if (contact) return response.redirect('/')
        next()
      })
      .catch( error => next(error) )
  } else { 
    response.sendStatus(403)
  }
})

router.get('/search', (request, response, next) => {
  const query = request.query.q
  contacts.search(query)
    .then(function(contacts) {
      if (contacts) return response.render('contacts/index', { query, contacts })
      next()
    })
    .catch( error => next(error) )
})

module.exports = router
