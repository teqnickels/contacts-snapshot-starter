const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const methodOverride = require('method-override')
const routes = require('./server/routes');
const middlewares = require('./server/middlewares');
const connect = require('connect')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')


//CREATE AND USE SESSION
app.use(session({
  secret: 'yellow cat',
  resave: false, 
  saveUninitialized: true,
  cookie: {
    expires: 600000
  }
}))


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use(middlewares.setDefaultResponseLocals)

app.use('/', routes)

app.use((request, response) => {
  response.render('common/not_found')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
