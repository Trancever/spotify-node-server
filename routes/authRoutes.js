const passport = require('passport')

module.exports = app => {
  app.get('/auth/spotify', passport.authenticate('spotify'))

  app.get(
    '/auth/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/')
    }
  )

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}
