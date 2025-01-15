import { Collection, Photo } from ".";

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
  collectionPhotos: AsyncState<Collection[]>;
}
export interface RootState {
  photo: PhotoState;
  collection: CollectionState;
}
