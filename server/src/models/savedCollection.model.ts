import mongoose, { Model, Schema } from "mongoose";
import { ISavedCollection } from "@/types";

const savedCollectionSchema = new Schema<ISavedCollection>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    collectionId: { type: String, required: true },
  },
  { timestamps: true }
);

const SavedCollection: Model<ISavedCollection> =
  mongoose.model<ISavedCollection>("SavedCollection", savedCollectionSchema);
export default SavedCollection;
