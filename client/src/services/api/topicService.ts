import { TOPIC_ENDPOINTS } from "@/services/constants/endpoints";
import { unsplashApi } from "@/services/utils/apiClient";
import { OrderByBasic } from "../../types/orderByOptions";

interface GetTopicsParams {
  ids?: string;
  page?: number;
  per_page?: number;
  order_by?: OrderByBasic;
}

export const getTopics = async ({
  ids = "",
  page = 1,
  per_page = 10,
  order_by = "latest",
}: GetTopicsParams) => {
  const response = await unsplashApi.get(TOPIC_ENDPOINTS.listTopics, {
    params: {
      ids,
      page,
      per_page,
      order_by,
    },
  });
  return response.data;
};

export const getTopicByIdOrSlug = async (id_or_slug: string) => {
  const response = await unsplashApi.get(
    TOPIC_ENDPOINTS.topicByIdOrSlug(id_or_slug)
  );
  return response.data;
};

export const getTopicPhotos = async ({
  id_or_slug,
  page = 1,
  per_page = 10,
  order_by = "latest",
}: {
  id_or_slug: string;
  page?: number;
  per_page?: number;
  order_by?: OrderByBasic;
}) => {
  const response = await unsplashApi.get(
    TOPIC_ENDPOINTS.topicPhotos(id_or_slug),
    {
      params: {
        page,
        per_page,
        order_by,
      },
    }
  );
  return response.data;
};
