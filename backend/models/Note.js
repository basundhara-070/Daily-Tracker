import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    subject: { type: String, required: true },
    docLink: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);