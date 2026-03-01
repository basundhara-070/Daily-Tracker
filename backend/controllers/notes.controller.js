import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
};

export const createNote = async (req, res) => {
  const { subject, docLink } = req.body;
  const note = await Note.create({ subject, docLink });
  res.status(201).json(note);
};