const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const { RPCRequest } = require('../utils');
const { FACEBOOK_CLIENT_ID, FACEBOOK_SECRET_KEY, FACEBOOK_CALLBACK_URL } = require('../config');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();



passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_SECRET_KEY,
      callbackURL: FACEBOOK_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {

      const user = await RPCRequest("CUSTOMER_RPC", {
        type: "FIND_CUSTOMER_BY_ID_AND_PROVIDER",
        data: {
          customer_account_id: profile.id,
          customer_provider: profile.provider
        }
      })

      if (!user) {
        console.log('Adding new facebook user to DB..');
        const newCustomer = await RPCRequest("CUSTOMER_RPC", {
          type: "NEW_CUSTOMER_WITH_SOCIAL",
          data: {
            customer_account_id: profile.id,
            customer_name: profile.displayName,
            customer_provider: profile.provider
          }
        })
        console.log('newcustomer:', newCustomer)
        return cb(null, profile);
      } else {
        console.log('Facebook User already exist in DB..');
        console.log(profile);
        return cb(null, profile);
      }
    }
  )
);

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get('/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, profile) => {
    req.user = profile
    next()
  })(req, res, next)
},
  function (req, res) {
    res.redirect(`http://localhost:3000/kiem-tra-dang-nhap/${req.user?.id}/${req.user?.provider}`);
  }
);

router.post('/login-success', async (req, res) => {
  const { userId, provider } = req.body
  console.log(userId,provider)
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

// router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

router.post('/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.redirect('http://localhost:3000')
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out fb user' });
  }
});

module.exports = router;
