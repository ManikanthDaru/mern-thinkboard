import mongoose from "mongoose";

// create a schema
const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{timestamps: true}); // adds createdAt and updatedAt fields

// create a model by wrapping the schema 
const Note = mongoose.model("Note", noteSchema);
export default Note;