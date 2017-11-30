const passport = require('passport')
const scope = require('./scopes')

module.exports = app => {
  app.get('/auth/spotify', passport.authenticate('spotify', { scope }))

  app.get('/auth/callback', passport.authenticate('spotify'), (req, res) => {
    res.redirect('/')
  })
}
