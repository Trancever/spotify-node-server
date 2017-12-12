const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean, GraphQLNonNull, GraphQLSchema } = graphql
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

const PlayListTracksType = new GraphQLObjectType({
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

const AlbumTracksType = new GraphQLObjectType({
  name: 'AlbumTracks',
  fields: {
    href: { type: GraphQLString },
    items: { type: new GraphQLList(TrackType) },
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
    tracks: { type: AlbumTracksType },
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
    description: { type: GraphQLString },
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

const FeaturedPlaylistsType = new GraphQLObjectType({
  name: 'FeaturedPlaylists',
  fields: {
    message: { type: GraphQLString },
    playlists: { type: PlaylistsType },
  },
})

const NewReleasesItemsType = new GraphQLObjectType({
  name: 'NewReleasesItems',
  fields: {
    href: { type: GraphQLString },
    items: { type: new GraphQLList(AlbumType) },
    limit: { type: GraphQLInt },
    next: { type: GraphQLString },
    offset: { type: GraphQLInt },
    previous: { type: GraphQLString },
    total: { type: GraphQLInt },
  },
})

const NewReleasesType = new GraphQLObjectType({
  name: 'NewReleases',
  fields: {
    albums: { type: NewReleasesItemsType },
  },
})

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    href: { type: GraphQLString },
    icons: { type: new GraphQLList(ImageType) },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
})

const CategoriesType = new GraphQLObjectType({
  name: 'Categories',
  fields: {
    href: { type: GraphQLString },
    items: { type: new GraphQLList(CategoryType) },
    limit: { type: GraphQLInt },
    next: { type: GraphQLString },
    offset: { type: GraphQLInt },
    previous: { type: GraphQLString },
    total: { type: GraphQLInt },
  },
})

const CategoryPlaylistsType = new GraphQLObjectType({
  name: 'CategoryPlaylists',
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

const RootQueryType = new GraphQLObjectType({
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
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { token }, req) {
        return axios
          .get(`https://api.spotify.com/v1/me`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(res => res.data)
      },
    },
    myAlbums: {
      type: AlbumsType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { limit = 20, offset = 0, token }, req) {
        return axios
          .get(`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(res => res.data)
      },
    },
    myPlaylists: {
      type: PlaylistsType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { limit = 20, offset = 0, token }, req) {
        return axios
          .get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(res => res.data)
      },
    },
    myPlaylist: {
      type: PlayListType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        playlistId: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { userId, playlistId, limit = 20, offset = 0, token }, req) {
        return axios
          .get(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(res => res.data)
      },
    },
    myPlaylistTracks: {
      type: PlayListTracksType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        playlistId: { type: new GraphQLNonNull(GraphQLString) },
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { userId, playlistId, limit = 20, offset = 0, token }, req) {
        return axios
          .get(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(res => res.data)
      },
    },
    myTracks: {
      type: PlayListTracksType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve(parentValue, { limit = 20, offset = 0 }, req) {
        return axios
          .get(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
            headers: {
              Authorization: 'Bearer ' + req.accessToken,
            },
          })
          .then(res => res.data)
      },
    },
    featuredPlaylists: {
      type: FeaturedPlaylistsType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        country: { type: GraphQLString },
      },
      resolve(parentValue, { offset = 0, limit = 20, country }, req) {
        const url = country
          ? `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&offset=${offset}&limit=${limit}`
          : `https://api.spotify.com/v1/browse/featured-playlists?offset=${offset}&limit=${limit}`
        return axios
          .get(url, {
            headers: {
              Authorization: 'Bearer ' + req.accessToken,
            },
          })
          .then(res => res.data)
      },
    },
    newReleases: {
      type: NewReleasesType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        country: { type: GraphQLString },
      },
      resolve(parentValue, { offset = 0, limit = 20, country }, req) {
        const url = country
          ? `https://api.spotify.com/v1/browse/new-releases?country=${country}&offset=${offset}&limit=${limit}`
          : `https://api.spotify.com/v1/browse/new-releases?offset=${offset}&limit=${limit}`
        return axios
          .get(url, {
            headers: {
              Authorization: 'Bearer ' + req.accessToken,
            },
          })
          .then(res => res.data)
      },
    },
    categories: {
      type: CategoriesType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        country: { type: GraphQLString },
      },
      resolve(parentValue, { offset = 0, limit = 20, country }, req) {
        const url = country
          ? `https://api.spotify.com/v1/browse/categories?country=${country}&offset=${offset}&limit=${limit}`
          : `https://api.spotify.com/v1/browse/categories?offset=${offset}&limit=${limit}`
        return axios
          .get(url, {
            headers: {
              Authorization: 'Bearer ' + req.accessToken,
            },
          })
          .then(res => res.data.categories)
      },
    },
    categoryPlaylists: {
      type: CategoryPlaylistsType,
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        country: { type: GraphQLString },
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { offset = 0, limit = 20, country, categoryId }, req) {
        const url = country
          ? `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=${country}&offset=${offset}&limit=${limit}`
          : `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?offset=${offset}&limit=${limit}`
        return axios
          .get(url, {
            headers: {
              Authorization: 'Bearer ' + req.accessToken,
            },
          })
          .then(res => res.data.playlists)
      },
    },
    album: {
      type: AlbumType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
        albumId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { token, albumId }, req) {
        return axios
          .get(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(res => res.data)
      },
    },
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    removeAlbumFromSaved: {
      type: AlbumType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
        albumId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { token, albumId }) {
        return axios
          .delete(
            'https://api.spotify.com/v1/me/albums',
            {
              ids: [albumId],
            },
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          )
          .then(res => res.data)
      },
    },
    saveAlbumForUser: {
      type: AlbumType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
        albumId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { token, albumId }) {
        return axios
          .put(
            'https://api.spotify.com/v1/me/albums',
            {
              ids: [albumId],
            },
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          )
          .then(res => res.data)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
})
