const passport = require('passport')
const axios = require('axios')
const loginRequired = require('../middlewares/loginRequired')

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

  app.get('/api/me', loginRequired, async (req, res) => {
    try {
      const result = await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: 'Bearer ' + req.accessToken,
        },
      })
      res.send(result.data)
    } catch (err) {
      res.send({ error: 'Something bad happened' })
    }
  })
}
