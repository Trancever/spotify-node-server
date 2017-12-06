const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')
const CryptoJS = require('crypto-js')

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
      callbackURL: 'http://localhost:3000',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const encryptedAccessToken = CryptoJS.AES.encrypt(accessToken, keys.CRYPT_KEY).toString()
      const encryptedRefreshToken = CryptoJS.AES.encrypt(refreshToken, keys.CRYPT_KEY).toString()

      const existingUser = await User.findOne({ spotifyId: profile.id })
      if (existingUser) {
        // User found
        await User.update(
          { spotifyId: profile.id },
          {
            accessToken: encryptedAccessToken,
            refreshToken: encryptedRefreshToken,
          }
        )
        const user = await User.findOne({ spotifyId: profile.id })
        return done(null, user)
      }
      // User not found, create one
      const newUser = await new User({
        spotifyId: profile.id,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
      }).save()
      done(null, newUser)
    }
  )
)
