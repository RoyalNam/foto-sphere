import mongoose, { Model, Schema } from "mongoose";
import { IFavorite } from "@/types";

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    photoId: { type: String, required: true },
  },
  { timestamps: true }
);

const Favorite: Model<IFavorite> = mongoose.model<IFavorite>(
  "Favorite",
  favoriteSchema
);
export default Favorite;
