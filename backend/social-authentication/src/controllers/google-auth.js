const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const { GOOGLE_CLIENT_ID, GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_SECRET } = require('../config');
const { RPCRequest } = require('../utils');
const router = express.Router();


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {

      const user = await RPCRequest("CUSTOMER_RPC", {
        type: "FIND_CUSTOMER_BY_ID_AND_PROVIDER",
        data: {
          customer_account_id: profile.id,
          customer_provider: profile.provider,
          customer_email: profile.emails[0].value
        }
      })
      if (!user) {
        console.log('Adding new google user to DB..');
        const newCustomer = await RPCRequest("CUSTOMER_RPC", {
          type: "NEW_CUSTOMER_WITH_SOCIAL",
          data: {
            customer_account_id: profile.id,
            customer_name: profile.displayName,
            customer_provider: profile.provider,
            customer_email: profile.emails[0].value,
            customer_avatar: profile.photos[0].value
          }
        })
        console.log('newcustomer:', newCustomer)
        return cb(null, profile);
      } else {
        console.log('Google User already exist in DB..');
        console.log(profile);
        return cb(null, profile);
      }
    }
  )
);

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// URL Must be same as 'Authorized redirect URIs' field of OAuth client, i.e: /auth/google/callback
router.get(
  '/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
      req.user = profile
      next()
    })(req, res, next)
  }, (req, res) => {
    res.redirect(`http://localhost:3000/kiem-tra-dang-nhap/${req.user?.id}/${req.user?.provider}`); // Successful authentication, redirect success.
  }
);

router.post('/login-success', async (req, res) => {
  const { userId, provider } = req.body
  // console.log(req.body)
  const user = await RPCRequest("CUSTOMER_RPC", {
    type: "LOGIN_WITH_SOCIAL",
    data: {
      customer_account_id: userId,
      customer_provider: provider
    }
  })
  user ? res.status(200).send({ message: 'Login success', metaData: user })
    : res.status(500).send({ message: "Login not success" })
});

// router.get('/error', (req, res) => res.send('Error logging in via Google..'));

router.get('/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.redirect('http://localhost:3000')
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out user' });
  }
});

module.exports = router;
