export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface FetchRandomPhotoParams {
  collections?: string;
  topics?: string;
  username?: string;
  query?: string;
  count?: number;
}

export interface FetchCollectionPhotosParams extends PaginationParams {
  id: string;
}
