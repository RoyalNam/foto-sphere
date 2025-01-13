import { SEARCH_ENDPOINTS } from "@/services/constants/endpoints";
import { unsplashApi } from "@/services/utils/apiClient";

interface SearchParams {
  query: string;
  page?: number;
  per_page?: number;
  color?: string;
  lang?: string;
}

export const searchPhotos = async ({
  query,
  page = 1,
  per_page = 10,
  color = "",
  lang = "en",
}: SearchParams) => {
  const response = await unsplashApi.get(SEARCH_ENDPOINTS.searchPhotos, {
    params: {
      query,
      page,
      per_page,
      color,
      lang,
    },
  });
  return response.data;
};

export const searchCollections = async ({
  query,
  page = 1,
  per_page = 10,
}: SearchParams) => {
  const response = await unsplashApi.get(SEARCH_ENDPOINTS.searchCollections, {
    params: {
      query,
      page,
      per_page,
    },
  });
  return response.data;
};

export const searchUsers = async ({
  query,
  page = 1,
  per_page = 10,
}: SearchParams) => {
  const response = await unsplashApi.get(SEARCH_ENDPOINTS.searchUsers, {
    params: {
      query,
      page,
      per_page,
    },
  });
  return response.data;
};
