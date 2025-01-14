import { Photo } from ".";

export interface AsyncState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

export const createAsyncState = <T>(defaultData: T): AsyncState<T> => ({
  data: defaultData,
  isLoading: false,
  error: null,
  hasMore: true,
});

export interface PhotoState {
  editorialFeed: AsyncState<Photo[]>;
  photoDetails: AsyncState<Photo | null>;
  randomPhoto: AsyncState<Photo | null>;
  likedPhotos: AsyncState<Photo[]>;
}

export interface RootState {
  photo: PhotoState;
}
