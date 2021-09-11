import connectMongo from 'connect-mongo'
import express from 'express';
import expressSession from 'express-session'
import exhbs from 'express-handlebars'
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

import { IMemberDoc } from './src/member/MemberDBModel.js';
import HTMLIDConstants from './src/constants/HTMLElementIDConstants.js'
import NodeSyntheticEventEmitter from '.src/framework/NodeSyntheticEventEmitter.js';
import employerRouter from './src/employer/employerRouter.js';
import member, { Member } from './src/member/Member.js';
import memberRouter from './src/member/memberRouter.js';
import connectDB from './src/db/db-init.js';
import initLocalStrategy from './src/authentication/passport-strategies.js';
import { COOKIE_SECRET, MONGO_URI } from './src/authentication/secrets.js';
import { MemberWriter } from './src/member/MemberInjectorNode.js';

import fsModule from 'fs';
//Add member to Express.Request so Typescript is happy about "req.member" references
declare global {
  namespace Express {
    interface Request {
      member?: Member;
    }
  }
}


const fs = fsModule.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Cookie', COOKIE_SECRET)

const app = express();

const PORT = process.env.PORT ?? 8080;

app.use(express.static('static'));

app.use((req, res, next) => {
  res.locals.HTML_IDS = HTMLIDConstants;
})

connectDB();

//Register Handlebars as our HTML rendering engine
app.engine('.hbs', exhbs({
  defaultLayout: 'index',
  extname: '.hbs',// change default extension to 'hbs' 
  helpers: {

  }
}))
app.set('views', './render-templates');
app.set('view engine', '.hbs');

//Setup session MW
const session = expressSession({
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: connectMongo.create({
    mongoUrl: MONGO_URI,
    collectionName: "sessions",
  }),
  cookie: {
    maxAge: 60000 * 1440
  }
});

app.use(session);

//Setup passport MW
app.use(passport.initialize());
app.use(passport.session());

//Setup Passport's local auth strategy
//!Note we must pass in this instance of passport
initLocalStrategy(passport);

//Register all the static paths for loading modules, images, etc.
console.log("Path:", path.join(__dirname, '/src/views'))
app.use('/src/member', express.static(path.join(__dirname, '/src/member')));
app.use(express.static(path.join(__dirname, '/src/models')));
app.use(express.static(path.join(__dirname, '/src/views')));
app.use(express.static(path.join(__dirname, '/src/views/images')));
app.use(express.static(path.join(__dirname, '/src/controllers')));
app.use(express.static(path.join(__dirname, '/src/views/css')));
app.use('/src/constantants', express.static(path.join(__dirname, '/src/constants')));
app.use('/src/app', express.static(path.join(__dirname, '/src/app')));
app.use(express.static(path.join(__dirname, '/css/')));
app.use(express.static(path.join(__dirname, '/images/')));


//Routes
//------
// Employer routes
app.use('/employer', employerRouter);
// Member routes
app.use('/member', memberRouter);


app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    //Already logged in, so display main app
    res.redirect('/main')
  }
  else {
    //Home page of App
    res.render('index')
  }
});

// Main App 
app.get('/main', (req, res) => {
  if (req.isAuthenticated()) {
    res.render("main", { layout: 'main' })
  }
  else {
    res.redirect('/');
  }
});

app.get('/home/signup', (req, res) => {
  res.render('signup', { layout: 'signup' })
});

app.use('/employer', employerRouter);


app.listen(PORT);