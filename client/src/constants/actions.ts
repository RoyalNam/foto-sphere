export const PHOTO_ACTIONS = {
  FETCH_EDITORIAL_FEED: "photo/fetchEditorialFeed",
  FETCH_PHOTO_BY_ID: "photo/fetchPhotoById",
  FETCH_RANDOM_PHOTO: "photo/fetchRandomPhoto",
};

export const COLLECTION_ACTIONS = {
  FETCH_COLLECTIONS: "collection/fetchCollections",
  FETCH_COLLECTION_BY_ID: "collection/fetchCollectionById",
  FETCH_COLLECTION_PHOTOS: "collection/fetchCollectionPhotos",
};

export const TOPIC_ACTIONS = {
  FETCH_TOPICS: "topic/fetchTopics",
  FETCH_TOPIC_BY_ID_OR_SLUG: "topic/fetchTopicByIdOrSlug",
  FETCH_TOPIC_PHOTOS: "topic/fetchTopicPhotos",
};

export const SEARCH_ACTIONS = {
  SEARCH_PHOTOS: "search/SEARCH_PHOTOS",
  SEARCH_COLLECTIONS: "search/SEARCH_COLLECTIONS",
  SEARCH_USERS: "search/SEARCH_USERS",
};

export const USER_ACTIONS = {
  FETCH_USER_INFO: "user/fetchUserInfo",
  FETCH_USER_PHOTOS: "user/fetchUserPhotos",
  FETCH_USER_COLLECTIONS: "user/fetchUserCollections",
  FETCH_USER_LIKES: "user/fetchUserLikes",
};
