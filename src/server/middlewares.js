
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
  next()
};

const restrictToLoggedInUsers = (request, response, next) => {
  if (request.session.email) {
    console.log('USER FOUND')
    next();
  } else {
    // request.session.error = 'Access denied!';
    response.redirect('/login');
  }
}

module.exports = { errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals, restrictToLoggedInUsers };
