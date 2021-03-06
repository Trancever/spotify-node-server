const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const keys = require('./config/keys')
const decryptMiddleware = require('./middlewares/descryptMiddleware')
const graphQL = require('express-graphql')
const GraphQlSchema = require('./schema/spotifySchema')
const cors = require('cors')
require('./models/user')
require('./services/passport')

mongoose.connect(keys.MONGO_URI)

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.COOKIE_KEY],
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(decryptMiddleware)
app.use(
  '/graphql',
  graphQL({
    schema: GraphQlSchema,
    graphiql: true,
  })
)

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
