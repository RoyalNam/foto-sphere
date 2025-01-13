import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEditorialFeed,
  getPhotoById,
  getRandomPhoto,
  likePhoto,
  unLikePhoto,
} from "@/services/api";
import {
  FetchEditorialFeedParams,
  FetchRandomPhotoParams,
  Photo,
} from "@/types";
import { fetchData } from "@/utils";
import { PHOTO_ACTIONS } from "@/constants";

export const fetchEditorialFeed = createAsyncThunk<
  Photo[],
  FetchEditorialFeedParams,
  { rejectValue: string }
>(
  PHOTO_ACTIONS.FETCH_EDITORIAL_FEED,
  async ({ page = 1, per_page = 10 }, { rejectWithValue }) => {
    return fetchData(getEditorialFeed, { page, per_page }, rejectWithValue);
  }
);

export const fetchPhotoById = createAsyncThunk<
  Photo,
  { photoId: string },
  { rejectValue: string }
>(PHOTO_ACTIONS.FETCH_PHOTO_BY_ID, async ({ photoId }, { rejectWithValue }) => {
  return fetchData(getPhotoById, photoId, rejectWithValue);
});

export const fetchRandomPhoto = createAsyncThunk<
  Photo,
  FetchRandomPhotoParams,
  { rejectValue: string }
>(
  PHOTO_ACTIONS.FETCH_RANDOM_PHOTO,
  async (
    {
      collections = "",
      topics = "",
      username = "",
      query = "",
      count = 1,
    }: FetchRandomPhotoParams,
    { rejectWithValue }
  ) => {
    return fetchData(
      getRandomPhoto,
      { collections, topics, username, query, count },
      rejectWithValue
    );
  }
);

export const likePhotoAction = createAsyncThunk<
  Photo[],
  string,
  { rejectValue: string }
>(PHOTO_ACTIONS.LIKE_PHOTO, async (photoId, { rejectWithValue }) => {
  return fetchData(likePhoto, photoId, rejectWithValue);
});

export const unLikePhotoAction = createAsyncThunk<
  Photo[],
  string,
  { rejectValue: string }
>(PHOTO_ACTIONS.UNLIKE_PHOTO, async (photoId, { rejectWithValue }) => {
  return fetchData(unLikePhoto, photoId, rejectWithValue);
});
