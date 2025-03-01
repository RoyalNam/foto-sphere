import { createSlice } from "@reduxjs/toolkit";
import { handleAsyncReducers } from "@/utils";
import { createAsyncState } from "@/types/stateTypes";
import {
  fetchUserCollections,
  fetchUserInfo,
  fetchUserLikes,
  fetchUserPhotos,
} from "../actions/userAction";

const initialState = {
  userInfo: createAsyncState(null),
  userPhotos: createAsyncState([], true),
  userCollections: createAsyncState([], true),
  userLikes: createAsyncState([], true),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserInfo: (state) => {
      state.userInfo = createAsyncState(null);
    },
    resetUserPhotos: (state) => {
      state.userPhotos = createAsyncState([], true);
    },
    resetUserCollections: (state) => {
      state.userCollections = createAsyncState([], true);
    },
    resetUserLikes: (state) => {
      state.userLikes = createAsyncState([], true);
    },
    resetAllUserData: (state) => {
      state.userInfo = createAsyncState(null);
      state.userPhotos = createAsyncState([], true);
      state.userCollections = createAsyncState([], true);
      state.userLikes = createAsyncState([], true);
    },
  },
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchUserInfo, "userInfo");
    handleAsyncReducers(builder, fetchUserPhotos, "userPhotos");
    handleAsyncReducers(builder, fetchUserCollections, "userCollections");
    handleAsyncReducers(builder, fetchUserLikes, "userLikes");
  },
});

export const {
  resetUserInfo,
  resetUserPhotos,
  resetUserCollections,
  resetUserLikes,
  resetAllUserData,
} = userSlice.actions;
export default userSlice.reducer;
