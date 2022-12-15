import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";
import mongooseAutoPopulate from "mongoose-autopopulate";

const schema = new mongoose.Schema(
  {
    choice: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
schema.plugin(mongooseAutoPopulate);
schema.post("save", handleDuplicateKeyError);
schema.post("update", handleDuplicateKeyError);
schema.post("findOneAndUpdate", handleDuplicateKeyError);
schema.post("insertMany", handleDuplicateKeyError);

const Choices = mongoose.model("Choices", schema);

export default Choices;
