import express from "express"
import expressEjsLayouts from "express-ejs-layouts"
import mongoose from "mongoose"
import session from "express-session"
import flash from "connect-flash"

import dotenv from "dotenv"
import passport from "passport"
//import session from "express-session"
import passportConfig from './config/passport.mjs'
import Post from "./models/post.mjs"
import User from "./models/user.mjs"
//import bcrypt from 'bcrypt'
import ensureAuthenticated from "./config/auth.mjs"
import { render } from "ejs"
dotenv.config();
passportConfig(passport);
const app = express();
const PORT = process.env.PORT || 5000
const mode = process.env.NODE_ENV
const Router = express.Router();

//BodyParser
// Use body-parser to parse JSON data sent via HTTP POST
//EJS
app.set('views', './views')
app.set('view engine', 'ejs');
//app.use(expressEjsLayout);
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize())
app.use(passport.session())

//app.use(express-session())

app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }))
//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
passportConfig(passport);
//use flash
app.use(session())
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})


// Set up a route to serve the homepage
app.get('/', (req, res) => {
  res.render('welcome');
});
app.get('/users/login', (req, res) => {
  res.render('login');
});
app.get('/users/register', (req, res) => {
  res.render('register');
});
app.get('/models/User', (req, res) => {
  res.render('login');
});


// DB Config
const URI = process.env.CONNECT_DB
// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true })
  .then(() => console.log("MongoBD Connected..."))
  .catch(err => console.log(err))

  .then(() => console.log('connected,,'))
  .catch((err) => console.log(err));

//mongoose.set("strictQuery", false);

//Routes
app.use('./routes/index', async (req, res) => {

});
//app.use('/users', ('./routes/users') =>{});


app.use('./index', async (req, res) => {

});
app.use('./users', async (req, res) => {

});

app.listen(4006);

