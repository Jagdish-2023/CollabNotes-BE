const express = require("express");
const router = express.Router();
const Note = require("../models/note.model");

router.post("/", async (req, res) => {
  const { title } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ error: "Note title is missing" });
    }

    const newNote = new Note({ title, content: "" });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Failed to create note: ", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

router.put("/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const { content } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { content: content || "" },
      { new: true }
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Failed to update note content: ", error);
    res.status(500).json({ error: "Failed to update note content" });
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Failed to get all notes: ", error);
    res.status(500).json({ error: "Failed to get all notes" });
  }
});

router.get("/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
});

module.exports = router;
