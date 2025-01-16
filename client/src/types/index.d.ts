export interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface User {
  id: string;
  accepted_tos: boolean;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  //   instagram_username: string;
  //   twitter_username: string;
  //   portfolio_url: string | null;
  bio: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  followed_by_user: boolean;
  followers_count: number;
  following_count: number;
  downloads: number;
  social: Social;
  profile_image: ProfileImage;
}

export interface PhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface Photo {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  current_user_collections: Collection[];
  urls: PhotoUrls;
}

export interface Collection {
  id: number;
  title: string;
  description?: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  total_photos: number;
  private: boolean;
  share_key: string;
  cover_photo: Photo | null;
  preview_photos: Photo[];
  user: User;
}

interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  published_at: string;
  updated_at: string;
  starts_at: string | null;
  ends_at: string | null;
  only_submissions_after: string | null;
  visibility: string;
  featured: boolean;
  total_photos: number;
  status: string;
  owners: User[];
  top_contributors: User[];
  cover_photo: Photo;
  preview_photos: Photo[];
}
