// eslint-disable-next-line no-unused-vars
const express = require('express')
const router = require('express-promise-router')()
const passport = require('passport')
// eslint-disable-next-line no-unused-vars
const passportConf = require('../passport')

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users')
const passportSignIn = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp)

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn)

router.route('/secret')
  .get(passportJWT, UsersController.secret)

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }))

module.exports = router