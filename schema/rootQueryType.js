const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql
const axios = require('axios')

const FollowersType = new GraphQLObjectType({
  name: 'Followers',
  fields: {
    href: { type: GraphQLString },
    total: { type: GraphQLString },
  },
})

const ExternalUrlsType = new GraphQLObjectType({
  name: 'ExternalUrls',
  fields: {
    spotify: { type: GraphQLString },
  },
})

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: {
    height: { type: GraphQLInt },
    width: { type: GraphQLString },
    url: { type: GraphQLString },
  },
})

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLString },
    display_name: { type: GraphQLString },
    type: { type: GraphQLString },
    birthdate: { type: GraphQLString },
    country: { type: GraphQLString },
    email: { type: GraphQLString },
    href: { type: GraphQLString },
    product: { type: GraphQLString },
    uri: { type: GraphQLString },
    external_urls: { type: ExternalUrlsType },
    followers: { type: FollowersType },
    images: { type: new GraphQLList(ImageType) },
  },
})

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: {
    album_type: { type: GraphQLString },
    artists: { type: new GraphQLList(UserType) },
    external_urls: { type: ExternalUrlsType },
    href: { type: GraphQLString },
    id: { type: GraphQLString },
    images: { type: new GraphQLList(ImageType) },
    name: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    release_date: { type: GraphQLString },
  },
})

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: {
    added_at: { type: GraphQLString },
    album: { type: AlbumType },
  },
})

const AlbumsType = new GraphQLObjectType({
  name: 'Albums',
  fields: {
    href: { type: GraphQLString },
    items: { type: new GraphQLList(ItemType) },
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
    myAlbums: {
      type: AlbumsType,
      resolve(parentValue, args, req) {
        return axios
          .get('https://api.spotify.com/v1/me/albums', {
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
