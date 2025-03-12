import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
  {
    googleId: { type: String, unique: true, sparse: true },
    provider: {
      type: String,
      enum: ["google", "local"],
      required: true,
      default: "local",
    },
    displayName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email format",
      },
    },
    avatar: { type: String },
    hashedPassword: { type: String, select: false, minlength: 8 },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
