import { PHOTO_ENDPOINTS } from "@/services/constants/endpoints";
import { unsplashApi } from "@/services/utils/apiClient";
import { GetRandomPhotoParams, PaginationParams } from "@/types/apiTypes";

export const getEditorialFeed = async ({
  page = 1,
  per_page = 10,
}: PaginationParams) => {
  const response = await unsplashApi.get(PHOTO_ENDPOINTS.editorialFeed, {
    params: {
      page,
      per_page,
    },
  });
  return response.data;
};

export const getPhotoById = async (id: string) => {
  const response = await unsplashApi.get(PHOTO_ENDPOINTS.photoById(id));
  return response.data;
};

export const getRandomPhoto = async ({
  collections = "",
  topics = "",
  username = "",
  query = "",
  count = 1,
}: GetRandomPhotoParams) => {
  const response = await unsplashApi.get(PHOTO_ENDPOINTS.randomPhoto, {
    params: {
      collections,
      topics,
      username,
      query,
      count,
    },
  });
  return response.data;
};
