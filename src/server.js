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
app.use(session({ //the only required option is 'secret' 
  secret: 'session', //used to sign the session id cookie
  resave : true, //forces the session to be saved in the session store whether there were changes made in the request or not
  saveUninitialized: false //forces an uninitialized session to be saved in the session store. an uninitialized session is a new and not yet modified session
}));

//WE AREN'T USING THE SESSION-STORE SETTING
//BY DEFAULT EXPRESS SAVES SESSION DATA IN THE SERVERS MEMORY, THIS IS ONLY SUITABLE FOR DEV
//IN PRODUCTION, STORE SESSION INFO IN DB

app.use((request, response, next) => {
  if(request.session) {
    console.log("This Is The Session", request.session)
    next()
  } else {
    console.log ("BISH! I SAID YOU AIN'T LOGGED IN!!!!!")
  }
})

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
