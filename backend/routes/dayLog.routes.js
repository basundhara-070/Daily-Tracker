import express from "express";
import DayLog from "../models/DayLog.js";

const router = express.Router();

// GET day log by date
router.get("/:date", async (req, res) => {
  const userId = "default";
  const { date } = req.params;

  try {
    let dayLog = await DayLog.findOne({ userId, date });
    if (!dayLog) {
      dayLog = new DayLog({ userId, date });
      await dayLog.save();
    }
    res.json(dayLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create/update day log by date
router.post("/:date", async (req, res) => {
  const userId = "default";
  const { date } = req.params;
  const { hours, notes } = req.body;

  try {
    const update = {
      hours: Array.isArray(hours) && hours.length === 24 ? hours : Array(24).fill("sleep"),
    };
    if (notes !== undefined) update.notes = notes;

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const dayLog = await DayLog.findOneAndUpdate({ userId, date }, update, options);

    res.json(dayLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
