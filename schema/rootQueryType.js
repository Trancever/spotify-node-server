const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql
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

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  fields: {
    external_urls: { type: ExternalUrlsType },
    href: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    uri: { type: GraphQLString },
  },
})

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  fields: {
    external_urls: { type: ExternalUrlsType },
    href: { type: GraphQLString },
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    uri: { type: GraphQLString },
  },
})

const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    album: { type: AlbumType },
    artists: { type: new GraphQLList(ArtistType) },
    disc_number: { type: GraphQLInt },
    duration_ms: { type: GraphQLInt },
    explicit: { type: GraphQLBoolean },
    external_urls: { type: ExternalUrlsType },
    href: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    preview_url: { type: GraphQLString },
    track_number: { type: GraphQLInt },
    type: { type: GraphQLString },
    uri: { type: GraphQLString },
  }),
})

const TrackItemType = new GraphQLObjectType({
  name: 'TrackItem',
  fields: {
    added_at: { type: GraphQLString },
    is_local: { type: GraphQLBoolean },
    track: { type: TrackType },
  },
})

const TracksType = new GraphQLObjectType({
  name: 'Tracks',
  fields: {
    href: { type: GraphQLString },
    items: { type: new GraphQLList(TrackItemType) },
    limit: { type: GraphQLInt },
    next: { type: GraphQLString },
    offset: { type: GraphQLInt },
    previous: { type: GraphQLString },
    total: { type: GraphQLInt },
  },
})

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: {
    album_type: { type: GraphQLString },
    artists: { type: new GraphQLList(ArtistType) },
    external_urls: { type: ExternalUrlsType },
    href: { type: GraphQLString },
    id: { type: GraphQLString },
    images: { type: new GraphQLList(ImageType) },
    name: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    release_date: { type: GraphQLString },
    tracks: { type: TracksType },
    type: { type: GraphQLString },
    uri: { type: GraphQLString },
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
    limit: { type: GraphQLInt },
    next: { type: GraphQLString },
    offset: { type: GraphQLInt },
    previous: { type: GraphQLString },
    total: { type: GraphQLInt },
  },
})

const CurrentUserType = new GraphQLObjectType({
  name: 'CurrentUser',
  fields: {
    spotifyId: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
  },
})

const SimpleTrackType = new GraphQLObjectType({
  name: 'SimpleTrack',
  fields: {
    href: { type: GraphQLString },
    total: { type: GraphQLInt },
  },
})

const PlayListType = new GraphQLObjectType({
  name: 'Playlist',
  fields: {
    collaborative: { type: GraphQLString },
    external_urls: { type: ExternalUrlsType },
    href: { type: GraphQLString },
    id: { type: GraphQLString },
    images: { type: new GraphQLList(ImageType) },
    name: { type: GraphQLString },
    owner: { type: OwnerType },
    public: { type: GraphQLBoolean },
    snapshot_id: { type: GraphQLString },
    tracks: { type: SimpleTrackType },
    type: { type: GraphQLString },
    uri: { type: GraphQLString },
  },
})

const PlaylistsType = new GraphQLObjectType({
  name: 'Playlists',
  fields: {
    href: { type: GraphQLString },
    items: { type: new GraphQLList(PlayListType) },
    limit: { type: GraphQLInt },
    next: { type: GraphQLString },
    offset: { type: GraphQLInt },
    previous: { type: GraphQLString },
    total: { type: GraphQLInt },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: CurrentUserType,
      resolve(parentValue, args, req) {
        return req.user
      },
    },
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
    myPlaylists: {
      type: PlaylistsType,
      resolve(parentValue, args, req) {
        return axios
          .get('https://api.spotify.com/v1/me/playlists', {
            headers: {
              Authorization: 'Bearer ' + req.accessToken,
            },
          })
          .then(res => res.data)
      },
    },
    Tracks: {
      type: TracksType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        playlistId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { userId, playlistId }, req) {
        return axios.default
          .get(
            `https://api.spotify.com/v1/users/${userId}/playlists/${
              playlistId
            }/tracks`,
            {
              headers: {
                Authorization: 'Bearer ' + req.accessToken,
              },
            }
          )
          .then(res => res.data)
      },
    },
  },
})

module.exports = RootQuery
