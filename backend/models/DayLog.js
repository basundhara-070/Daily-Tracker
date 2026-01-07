import mongoose from "mongoose";

const DayLogSchema = new mongoose.Schema(
  {
    userId: { type: String, default: "default" },
    date: { type: String, required: true }, // format "YYYY-MM-DD"
    hours: {
      type: [String],
      default: () => Array(24).fill("sleep"),
      validate: [arr => arr.length === 24, "hours array must be length 24"],
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

DayLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("DayLog", DayLogSchema);
