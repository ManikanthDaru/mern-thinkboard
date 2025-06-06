import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNotes,
} from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

// placeholder for a dynamic element
router.put("/:id", updateNote);

router.delete("/:id", deleteNotes);

export default router;
