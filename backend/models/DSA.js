import mongoose from "mongoose";

const dsaSchema = mongoose.Schema(
  {
    algorithm: String,
    timeComplexity: String,
    explanation: String
  },
  { timestamps: true }
);

export default mongoose.model("DSA", dsaSchema);