import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCollections,
  getCollectionById,
  getCollectionPhotos,
} from "@/services/api";
import { COLLECTION_ACTIONS } from "@/constants/actions";
import { fetchData } from "@/utils";
import { Collection, Photo } from "@/types";
import { PaginationParams, PaginationWithId } from "@/types/apiTypes";

export const fetchCollections = createAsyncThunk<
  { data: Collection[]; hasMore: boolean },
  PaginationParams,
  { rejectValue: string }
>(
  COLLECTION_ACTIONS.FETCH_COLLECTIONS,
  async ({ page = 1, per_page = 10 }, { rejectWithValue }) => {
    try {
      const data = (await getCollections({ page, per_page })) as Collection[];
      const hasMore = data.length === per_page;

      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to fetch collections.");
    }
  }
);

export const fetchCollectionById = createAsyncThunk<
  Collection,
  { id: string },
  { rejectValue: string }
>(
  COLLECTION_ACTIONS.FETCH_COLLECTION_BY_ID,
  async ({ id }, { rejectWithValue }) => {
    return fetchData(getCollectionById, id, rejectWithValue);
  }
);

export const fetchCollectionPhotos = createAsyncThunk<
  { data: Photo[]; hasMore: boolean },
  PaginationWithId,
  { rejectValue: string }
>(
  COLLECTION_ACTIONS.FETCH_COLLECTION_PHOTOS,
  async ({ id, page = 1, per_page = 10 }, { rejectWithValue }) => {
    try {
      const data = (await getCollectionPhotos({
        id,
        page,
        per_page,
      })) as Photo[];
      const hasMore = data.length === per_page;

      return { data, hasMore };
    } catch (error) {
      return rejectWithValue("Failed to fetch collection photos.");
    }
  }
);
