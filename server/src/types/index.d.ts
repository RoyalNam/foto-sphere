import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  googleId?: string;
  provider: "google" | "local";
  displayName: string;
  email: string;
  avatar?: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICollection {
  userId: Types.ObjectId;
  title: string;
  description?: string;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISavedCollection {
  userId: Types.ObjectId;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFavorite {
  userId: Types.ObjectId;
  photoId: string;
  createdAt: Date;
  updatedAt: Date;
}
