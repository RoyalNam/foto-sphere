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

export interface ExifData {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

export interface Location {
  city: string;
  country: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

export interface Tag {
  type?: string;
  title: string;
}

export interface Photo {
  alt_description: string;
  color: string;
  created_at: string;
  current_user_collections: Collection[];
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  slug: string;
  updated_at: string;
  urls: PhotoUrls;
  user: User;
  width: number;
}
export interface ExtendedPhoto extends Photo {
  blur_hash: string;
  downloads: number;
  exif: ExifData;
  location: Location;
  tags: Tag[];
  views: number;
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
