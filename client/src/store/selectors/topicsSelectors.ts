import { createSelector } from "@reduxjs/toolkit";
import { RootState, TopicState } from "@/types/stateTypes";

export const selectTopicState = (state: RootState): TopicState => state.topic;

export const selectTopics = createSelector(
  selectTopicState,
  (state: TopicState) => state.topics
);

export const selectTopicDetails = createSelector(
  selectTopicState,
  (state: TopicState) => state.topicDetails
);

export const selectTopicPhotos = createSelector(
  selectTopicState,
  (state: TopicState) => state.topicPhotos
);
