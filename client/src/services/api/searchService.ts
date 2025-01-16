import { SEARCH_ENDPOINTS } from "@/services/constants/endpoints";
import { unsplashApi } from "@/services/utils/apiClient";
import { SearchParams } from "@/types/apiTypes";

export const searchPhotos = async ({
  query,
  page = 1,
  per_page = 10,
  lang = "en",
}: SearchParams) => {
  const response = await unsplashApi.get(SEARCH_ENDPOINTS.searchPhotos, {
    params: {
      query,
      page,
      per_page,
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
