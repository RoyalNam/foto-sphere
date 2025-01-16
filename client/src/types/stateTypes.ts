import { Collection, Photo, Topic } from ".";

export interface AsyncState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
  hasMore?: boolean;
}

export const createAsyncState = <T>(
  defaultData: T,
  hasMore: boolean | undefined = undefined
): AsyncState<T> => ({
  data: defaultData,
  isLoading: false,
  error: null,
  hasMore: hasMore,
});

export interface PhotoState {
  editorialFeed: AsyncState<Photo[]>;
  photoDetails: AsyncState<Photo | null>;
  randomPhoto: AsyncState<Photo | null>;
}
export interface CollectionState {
  collections: AsyncState<Collection[]>;
  collectionDetails: AsyncState<Collection | null>;
  collectionPhotos: AsyncState<Photo[]>;
}

export interface TopicState {
  topics: AsyncState<Topic[]>;
  topicDetails: AsyncState<Topic | null>;
  topicPhotos: AsyncState<Photo[]>;
}
export interface RootState {
  photo: PhotoState;
  collection: CollectionState;
  topic: TopicState;
}
