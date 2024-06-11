const express = require('express');
const cors = require("cors");
const session = require('express-session');
const authRouter = require('./controllers/google-auth');
const facebookRouter = require('./controllers/facebook-auth');
const protectedRouter = require('./controllers/protected-route');
const passport = require('passport');
const { PORT, SERVICE } = require('./config');
const morgan = require('morgan');
const compression = require('compression');
const { default: helmet } = require('helmet');
const cookieParser = require("cookie-parser");

const startService = async () => {
  const app = express()
  app.use(cors())
  app.use(morgan("dev"))
  app.use(compression())
  app.use(helmet())
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));

  app.set('view engine', 'ejs');
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  // app.get('/', (req, res) => {
  //   res.render('auth');
  // });

  app.use('/google', authRouter);
  app.use('/facebook', facebookRouter);
  app.use('/protected', protectedRouter);

  app.listen(PORT || 3003, () => {
    console.log(`listening to port ${PORT}, ${SERVICE}`);
  })
    .on('error', (err) => {
      console.log(err);
      process.exit();
    })

}

startService()