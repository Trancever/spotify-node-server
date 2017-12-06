const passport = require('passport')
const scope = require('./scopes')

module.exports = app => {
  app.get('/auth/spotify', passport.authenticate('spotify', { scope, showDialog: true }))

  app.get('/auth/callback', passport.authenticate('spotify'), (req, res) => {
    res.redirect('http://localhost:3000')
  })
}
