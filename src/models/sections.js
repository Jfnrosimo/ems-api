import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";
import mongooseAutoPopulate from "mongoose-autopopulate";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "active",
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
        autopopulate: true,
        default: [],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
schema.plugin(mongooseAutoPopulate);
schema.post("save", handleDuplicateKeyError);
schema.post("update", handleDuplicateKeyError);
schema.post("findOneAndUpdate", handleDuplicateKeyError);
schema.post("insertMany", handleDuplicateKeyError);

const Sections = mongoose.model("Sections", schema);

export default Sections;
