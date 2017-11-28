const passport = require('passport')

module.exports = app => {
  app.get('/auth/spotify', passport.authenticate('spotify'), (req, res) => {
    console.log('req', req)
    console.log('res', res)
  })

  app.get(
    '/auth/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/')
    }
  )
}
