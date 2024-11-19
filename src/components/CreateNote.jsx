import { useContext, useState } from "react";
import { NoteContext } from "../context/note.context";
import "./CreateNote.css"

const CreateNote = () => {
  const { addNote } = useContext(NoteContext);
  const [noteTitle, setNoteTitle] = useState("");

  const createId = () => {
    return Date.now().toString(36);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteTitle) return;

    const newNote = {
      id: createId(),
      title: noteTitle,
      marked: false,
    };

    addNote(newNote);
    setNoteTitle("");
  };

  

  const handleInput = (e) => {
    setNoteTitle(e.target.value);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="note-title"
        placeholder="Nueva nota"
        value={noteTitle}
        onChange={handleInput}
      />
      <button className="create-btn">+</button>
    </form>
  );
};

export default CreateNote;
