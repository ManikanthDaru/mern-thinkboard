import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).sort({createdAt: -1}); // show the newest first
    res.status(200).json(notes);
  }
  catch (err) {
    console.log("Error in getAllNotes controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  }
  catch (err) {
    console.log("Error in getNoteById controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content
    });

    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  }
  catch (err) {
    console.log("Error in createNote controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  // edit the notes
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content },{new:true});
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully" });
  }
  catch (err) {
    console.log("Error in updateNote controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotes = async (req, res) => {
  // delete the notes
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Not not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  }
  catch (err) {
    console.log("Error in deleteNote controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

