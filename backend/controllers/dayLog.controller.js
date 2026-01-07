import DayLog from "../models/DayLog.js";

export const getDay = async (req, res) => {
  const { date } = req.params;

  let log = await DayLog.findOne({ date });
  if (!log) {
    log = await DayLog.create({ date });
  }

  res.json(log);
};

export const updateDay = async (req, res) => {
  const { date } = req.params;
  const { hours, notes } = req.body;

  const log = await DayLog.findOneAndUpdate(
    { date },
    { hours, notes },
    { new: true, upsert: true }
  );

  res.json(log);
};
