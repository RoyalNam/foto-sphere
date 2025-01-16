import { USER_ENDPOINTS } from "@/services/constants/endpoints";
import { unsplashApi } from "@/services/utils/apiClient";
import { GetUserParams } from "@/types/apiTypes";

export const getUserInfo = async (username: string) => {
  const response = await unsplashApi.get(USER_ENDPOINTS.userInfo(username));
  return response.data;
};

export const getUserPhotos = async ({
  username,
  page = 1,
  per_page = 10,
  order_by = "latest",
}: GetUserParams) => {
  const response = await unsplashApi.get(USER_ENDPOINTS.userPhotos(username), {
    params: {
      page,
      per_page,
      order_by,
    },
  });
  return response.data;
};

export const getUserCollections = async ({
  username,
  page = 1,
  per_page = 10,
}: GetUserParams) => {
  const response = await unsplashApi.get(
    USER_ENDPOINTS.userCollections(username),
    {
      params: {
        page,
        per_page,
      },
    }
  );
  return response.data;
};

export const getUserLikes = async ({
  username,
  page = 1,
  per_page = 10,
  order_by = "latest",
}: GetUserParams) => {
  const response = await unsplashApi.get(USER_ENDPOINTS.userLikes(username), {
    params: {
      page,
      per_page,
      order_by,
    },
  });
  return response.data;
};
