import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserInfo,
  getUserPhotos,
  getUserCollections,
  getUserLikes,
} from "@/services/api";
import { fetchData } from "@/utils";
import { Photo, Collection, User } from "@/types";
import { GetUserParams } from "@/types/apiTypes";
import { USER_ACTIONS } from "@/constants";

export const fetchUserInfo = createAsyncThunk<
  User,
  { username: string },
  { rejectValue: string }
>(USER_ACTIONS.FETCH_USER_INFO, async ({ username }, { rejectWithValue }) => {
  return fetchData(getUserInfo, username, rejectWithValue);
});

export const fetchUserPhotos = createAsyncThunk<
  { data: Photo[]; hasMore: boolean },
  GetUserParams,
  { rejectValue: string }
>(
  USER_ACTIONS.FETCH_USER_PHOTOS,
  async (
    { username, page = 1, per_page = 10, order_by = "latest" },
    { rejectWithValue }
  ) => {
    try {
      const data = (await getUserPhotos({
        username,
        page,
        per_page,
        order_by,
      })) as Photo[];
      const hasMore = data.length === per_page;
      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to load user photos.");
    }
  }
);

export const fetchUserCollections = createAsyncThunk<
  { data: Collection[]; hasMore: boolean },
  GetUserParams,
  { rejectValue: string }
>(
  USER_ACTIONS.FETCH_USER_COLLECTIONS,
  async ({ username, page = 1, per_page = 10 }, { rejectWithValue }) => {
    try {
      const data = (await getUserCollections({
        username,
        page,
        per_page,
      })) as Collection[];
      const hasMore = data.length === per_page;
      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to load user collections.");
    }
  }
);

export const fetchUserLikes = createAsyncThunk<
  { data: Photo[]; hasMore: boolean },
  GetUserParams,
  { rejectValue: string }
>(
  USER_ACTIONS.FETCH_USER_LIKES,
  async (
    { username, page = 1, per_page = 10, order_by = "latest" },
    { rejectWithValue }
  ) => {
    try {
      const data = (await getUserLikes({
        username,
        page,
        per_page,
        order_by,
      })) as Photo[];
      const hasMore = data.length === per_page;
      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to load user likes.");
    }
  }
);
