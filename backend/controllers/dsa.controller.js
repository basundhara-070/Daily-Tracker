import DSA from "../models/DSA.js";

export const getDSA = async (req, res) => {
  try {
    const dsas = await DSA.find().sort({ createdAt: -1 });
    res.json(dsas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createDSA = async (req, res) => {
  try {
    const { algorithm, timeComplexity, explanation } = req.body;
    if (!algorithm || !timeComplexity || !explanation) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const dsa = await DSA.create({ algorithm, timeComplexity, explanation });
    res.status(201).json(dsa);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
