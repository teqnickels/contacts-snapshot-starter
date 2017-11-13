
const errorHandler = (error, request, response, next) => {
  response.status(500).send('Something bad happened. This page should be nicer looking');
};

const logErrors = (error, request, response, next) => {
  console.error(error.stack)
  next(error);
};

const notFoundHandler = (request, response) => {
  response.status(404).render('common/not_found')
};

const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  if(request.session.email) {
    response.locals.session = true
  } else {
    response.locals.session = false
  }
  next()
};

const restrictToLoggedInUsers = (request, response, next) => {
  if (request.session.email) {
    next();
  } else {
    response.redirect('/login');
  }

}

module.exports = { errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals, restrictToLoggedInUsers };
