const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.CLIENT_ID,
      clientSecret: keys.CLIENT_SECRET,
      callbackURL: '/auth/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ spotifyId: profile.Id })
      if (existingUser) {
        // User found
        return done(null, existingUser)
      }
      // User not found, create one
      const newUser = await new User({ spotifyId: profile.id }).save()
      done(null, newUser)
    }
  )
)
