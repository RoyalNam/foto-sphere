import { PHOTO_ENDPOINTS } from "@/services/constants/endpoints";
import { unsplashApi } from "@/services/utils/apiClient";

interface GetEditorialFeedParams {
  page?: number;
  per_page?: number;
}

interface GetRandomPhotoParams {
  collections?: string;
  topics?: string;
  username?: string;
  query?: string;
  count?: number;
}

export const getEditorialFeed = async ({
  page = 1,
  per_page = 10,
}: GetEditorialFeedParams) => {
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

export const likePhoto = async (id: string) => {
  const response = await unsplashApi.post(PHOTO_ENDPOINTS.likePhoto(id));
  return response.data;
};

export const unLikePhoto = async (id: string) => {
  const response = await unsplashApi.delete(PHOTO_ENDPOINTS.likePhoto(id));
  return response.data;
};
