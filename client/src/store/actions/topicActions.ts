import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTopics, getTopicByIdOrSlug, getTopicPhotos } from "@/services/api";
import { TOPIC_ACTIONS } from "@/constants/actions";
import { Photo, Topic } from "@/types";
import { SortOptionsBasic, TopicSortOptions } from "@/types/orderByOptions";

export const fetchTopics = createAsyncThunk<
  { data: Topic[]; hasMore: boolean },
  {
    ids?: string;
    page?: number;
    per_page?: number;
    order_by?: TopicSortOptions;
  },
  { rejectValue: string }
>(
  TOPIC_ACTIONS.FETCH_TOPICS,
  async ({ page = 1, per_page = 10, order_by }, { rejectWithValue }) => {
    try {
      const data = (await await getTopics({
        page,
        per_page,
        order_by,
      })) as Topic[];
      const hasMore = data.length === per_page;

      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to fetch topics.");
    }
  }
);

export const fetchTopicByIdOrSlug = createAsyncThunk<
  Topic,
  string,
  { rejectValue: string }
>(
  TOPIC_ACTIONS.FETCH_TOPIC_BY_ID_OR_SLUG,
  async (id_or_slug, { rejectWithValue }) => {
    try {
      return (await getTopicByIdOrSlug(id_or_slug)) as Topic;
    } catch (error) {
      return rejectWithValue("Failed to fetch topic by ID or slug.");
    }
  }
);

export const fetchTopicPhotos = createAsyncThunk<
  { data: Photo[]; hasMore: boolean },
  {
    id_or_slug: string;
    page?: number;
    per_page?: number;
    order_by?: SortOptionsBasic;
  },
  { rejectValue: string }
>(
  TOPIC_ACTIONS.FETCH_TOPIC_PHOTOS,
  async (
    { id_or_slug, page = 1, per_page = 10, order_by = "latest" },
    { rejectWithValue }
  ) => {
    try {
      const data = (await getTopicPhotos({
        id_or_slug,
        page,
        per_page,
        order_by,
      })) as Photo[];
      const hasMore = data.length === per_page;

      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to fetch topic photos.");
    }
  }
);
