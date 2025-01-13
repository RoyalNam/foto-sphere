type UserEndpoints = {
  userInfo: (username: string) => string;
  userPhotos: (username: string) => string;
  userCollections: (username: string) => string;
  userLikes: (username: string) => string;
};

export const USER_ENDPOINTS: UserEndpoints = {
  userInfo: (username) => `/users/${username}`,
  userPhotos: (username) => `/users/${username}/photos`,
  userCollections: (username) => `/users/${username}/collections`,
  userLikes: (username) => `/users/${username}/likes`,
};

type PhotoEndpoints = {
  editorialFeed: string;
  photoById: (id: string) => string;
  randomPhoto: string;
  likePhoto: (id: string) => string;
};

export const PHOTO_ENDPOINTS: PhotoEndpoints = {
  editorialFeed: "/photos",
  photoById: (id) => `/photos/${id}`,
  randomPhoto: "/photos/random",
  likePhoto: (id) => `/photos/${id}/like`,
};

type SearchEndpoints = {
  searchPhotos: string;
  searchCollections: string;
  searchUsers: string;
};

export const SEARCH_ENDPOINTS: SearchEndpoints = {
  searchPhotos: "/search/photos",
  searchCollections: "/search/collections",
  searchUsers: "/search/users",
};

type CollectionEndpoints = {
  listCollections: string;
  collectionById: (id: string) => string;
  collectionPhotos: (id: string) => string;
};

export const COLLECTION_ENDPOINTS: CollectionEndpoints = {
  listCollections: "/collections",
  collectionById: (id) => `/collections/${id}`,
  collectionPhotos: (id) => `/collections/${id}/photos`,
};

type TopicEndpoints = {
  listTopics: string;
  topicByIdOrSlug: (id_or_slug: string) => string;
  topicPhotos: (id_or_slug: string) => string;
};

export const TOPIC_ENDPOINTS: TopicEndpoints = {
  listTopics: "/topics",
  topicByIdOrSlug: (id_or_slug) => `/topics/${id_or_slug}`,
  topicPhotos: (id_or_slug) => `/topics/${id_or_slug}/photos`,
};
