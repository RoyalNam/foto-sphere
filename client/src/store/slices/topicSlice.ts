import { createSlice } from "@reduxjs/toolkit";
import { handleAsyncReducers } from "@/utils";
import { createAsyncState } from "@/types/stateTypes";
import {
  fetchTopicByIdOrSlug,
  fetchTopicPhotos,
  fetchTopics,
} from "../actions/topicActions";

const initialState = {
  topics: createAsyncState([], true),
  topicDetails: createAsyncState(null),
  topicPhotos: createAsyncState([], true),
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    resetTopics: (state) => {
      state.topics = createAsyncState([], true);
    },
    resetTopicDetails: (state) => {
      state.topicDetails = createAsyncState(null);
    },
    resetTopicPhotos: (state) => {
      state.topicPhotos = createAsyncState([], true);
    },
    resetAlltopics: (state) => {
      state.topics = createAsyncState([], true);
      state.topicDetails = createAsyncState(null);
      state.topicPhotos = createAsyncState([], true);
    },
  },
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchTopics, "topics");
    handleAsyncReducers(builder, fetchTopicByIdOrSlug, "topicDetails");
    handleAsyncReducers(builder, fetchTopicPhotos, "topicPhotos");
  },
});

export const {
  resetTopics,
  resetTopicDetails,
  resetTopicPhotos,
  resetAlltopics,
} = topicsSlice.actions;
export default topicsSlice.reducer;
