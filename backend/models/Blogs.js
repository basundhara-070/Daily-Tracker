import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: String,
    content: String, // HTML string from rich text editor
    coverImage: String
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);