import mongoose, { Model, Schema } from "mongoose";
import { ICollection } from "@/types";

const collectionSchema = new Schema<ICollection>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    photos: {
      type: [{ type: String, trim: true }],
      validate: {
        validator: (photos: string[]) => {
          return photos.length === new Set(photos).size;
        },
        message: "Photos must be unique",
      },
    },
  },
  { timestamps: true }
);

const Collection: Model<ICollection> = mongoose.model<ICollection>(
  "Collection",
  collectionSchema
);

export default Collection;
