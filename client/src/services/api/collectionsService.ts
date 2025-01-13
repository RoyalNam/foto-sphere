import { COLLECTION_ENDPOINTS } from "@/services/constants/endpoints";
import { unsplashApi } from "@/services/utils/apiClient";

interface GetCollectionsParams {
  page?: number;
  per_page?: number;
}

interface GetCollectionPhotosParams {
  id: string;
  page?: number;
  per_page?: number;
}

export const getCollections = async ({
  page = 1,
  per_page = 10,
}: GetCollectionsParams) => {
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
}: GetCollectionPhotosParams) => {
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
