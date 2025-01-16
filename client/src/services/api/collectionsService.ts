import { COLLECTION_ENDPOINTS } from "@/services/constants/endpoints";
import { unsplashApi } from "@/services/utils/apiClient";
import { PaginationParams, PaginationWithId } from "@/types/apiTypes";

export const getCollections = async ({
  page = 1,
  per_page = 10,
}: PaginationParams) => {
  const response = await unsplashApi.get(COLLECTION_ENDPOINTS.listCollections, {
    params: {
      page,
      per_page,
    },
  });
  return response.data;
};

export const getCollectionById = async (id: string) => {
  const response = await unsplashApi.get(
    COLLECTION_ENDPOINTS.collectionById(id)
  );
  return response.data;
};

export const getCollectionPhotos = async ({
  id,
  page = 1,
  per_page = 10,
}: PaginationWithId) => {
  const response = await unsplashApi.get(
    COLLECTION_ENDPOINTS.collectionPhotos(id),
    {
      params: {
        page,
        per_page,
      },
    }
  );
  return response.data;
};
