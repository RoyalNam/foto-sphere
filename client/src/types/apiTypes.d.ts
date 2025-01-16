export type SortOptionsBasic = "latest" | "oldest" | "popular";
export type SortOptions = SortOptionsBasic | "views" | "downloads";
export type TopicSortOptions = "featured" | "latest" | "oldest" | "position";

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface PaginationWithId extends PaginationParams {
  id: string;
}

export interface GetRandomPhotoParams {
  collections?: string;
  topics?: string;
  username?: string;
  query?: string;
  count?: number;
}

export interface SearchParams {
  query: string;
  page?: number;
  per_page?: number;
  lang?: string;
}

export interface GetTopicsParams {
  page?: number;
  per_page?: number;
  order_by?: TopicSortOptions;
}

export interface GetTopicPhotosParams {
  id_or_slug: string;
  page?: number;
  per_page?: number;
  order_by?: SortOptionsBasic;
}

export interface GetUserParams {
  username: string;
  page?: number;
  per_page?: number;
  order_by?: SortOptionsBasic | SortOptions;
}
