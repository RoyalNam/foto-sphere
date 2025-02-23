import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEditorialFeed, getPhotoById, getRandomPhoto } from "@/services/api";
import { fetchData } from "@/utils";
import { PHOTO_ACTIONS } from "@/constants";
import { ExtendedPhoto, Photo } from "@/types";
import { GetRandomPhotoParams, PaginationParams } from "@/types/apiTypes";

export const fetchEditorialFeed = createAsyncThunk<
  { data: Photo[]; hasMore: boolean },
  PaginationParams,
  { rejectValue: string }
>(
  PHOTO_ACTIONS.FETCH_EDITORIAL_FEED,
  async ({ page = 1, per_page = 25 }, { rejectWithValue }) => {
    try {
      const data = (await getEditorialFeed({ page, per_page })) as Photo[];
      const hasMore = data.length === per_page;

      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to load editorial feed.");
    }
  }
);

export const fetchPhotoById = createAsyncThunk<
  ExtendedPhoto,
  { photoId: string },
  { rejectValue: string }
>(PHOTO_ACTIONS.FETCH_PHOTO_BY_ID, async ({ photoId }, { rejectWithValue }) => {
  return fetchData(getPhotoById, photoId, rejectWithValue);
});

export const fetchRandomPhoto = createAsyncThunk<
  Photo,
  GetRandomPhotoParams,
  { rejectValue: string }
>(
  PHOTO_ACTIONS.FETCH_RANDOM_PHOTO,
  async (
    { collections = "", topics = "", username = "", query = "", count = 1 },
    { rejectWithValue }
  ) => {
    return fetchData(
      getRandomPhoto,
      { collections, topics, username, query, count },
      rejectWithValue
    );
  }
);
