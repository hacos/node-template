const bodyParser = require('body-parser');
const debug = require('debug')('app');
const express = require('express');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

// App
const app = express();
app.use(express.json());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Session
const sess = {
  secret: process.env.ACCESS_TOKEN,
  cookie: {},
  resave: false,
  saveUninitialized: true
}

sess.proxy = true;
sess.cookie.secure = true;
app.set('trust proxy', 1);
app.use(session(sess));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Helmets and morgan
const helmet = require('helmet');
const morgan = require('morgan');
app.use(helmet());
app.use(morgan('tiny'));

// Begin server stuff
app.get('/health-check', (req, res) => res.sendStatus(200)); // health check

// Routes
const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
  if (error) { throw error; }
  process.env.DEV_MODE = (process.env.DEV_MODE === 'true')
  const worker = (process.env.DEV_MODE === 'false') ? require('./worker') : null
  console.log(`node-template is listening at localhost on port ${port}`);
})

module.exports = app;
