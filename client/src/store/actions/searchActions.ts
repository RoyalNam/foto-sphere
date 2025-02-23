import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchPhotos, searchCollections, searchUsers } from "@/services/api";
import { SEARCH_ACTIONS } from "@/constants/actions";
import { Photo, Collection, User } from "@/types";
import { SearchParams } from "@/types/apiTypes";

export const fetchSearchPhotos = createAsyncThunk<
  { data: Photo[]; hasMore: boolean },
  SearchParams,
  { rejectValue: string }
>(
  SEARCH_ACTIONS.SEARCH_PHOTOS,
  async (
    { query, page = 1, per_page = 10, lang = "en" },
    { rejectWithValue }
  ) => {
    try {
      const response = (await searchPhotos({
        query,
        page,
        per_page,
        lang,
      })) as {
        results: Photo[];
        total: number;
        total_pages: number;
      };

      const hasMore = response.total_pages > page;

      return { data: response.results, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to search photos.");
    }
  }
);

export const fetchSearchCollections = createAsyncThunk<
  { data: Collection[]; hasMore: boolean },
  SearchParams,
  { rejectValue: string }
>(
  SEARCH_ACTIONS.SEARCH_COLLECTIONS,
  async ({ query, page = 1, per_page = 10 }, { rejectWithValue }) => {
    try {
      const response = (await searchCollections({ query, page, per_page })) as {
        results: Collection[];
        total: number;
        total_pages: number;
      };

      const hasMore = response.total_pages > page;
      return { data: response.results, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to search collections.");
    }
  }
);

export const fetchSearchUsers = createAsyncThunk<
  { data: User[]; hasMore: boolean },
  SearchParams,
  { rejectValue: string }
>(
  SEARCH_ACTIONS.SEARCH_USERS,
  async ({ query, page = 1, per_page = 10 }, { rejectWithValue }) => {
    try {
      const response = (await searchUsers({ query, page, per_page })) as {
        results: User[];
        total: number;
        total_pages: number;
      };

      const hasMore = response.total_pages > page;
      return { data: response.results, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to search users.");
    }
  }
);
