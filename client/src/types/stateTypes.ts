import { Photo } from "./types";

export interface AsyncState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

export const createAsyncState = <T>(defaultData: T): AsyncState<T> => ({
  data: defaultData,
  isLoading: false,
  error: null,
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
