const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql
const axios = require('axios')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLString },
    display_name: { type: GraphQLString },
    type: { type: GraphQLString },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    me: {
      type: UserType,
      resolve(parentValue, args, req) {
        return axios
          .get(`https://api.spotify.com/v1/me`, {
            headers: {
              Authorization: 'Bearer ' + req.accessToken,
            },
          })
          .then(res => res.data)
      },
    },
  },
})

module.exports = RootQuery
