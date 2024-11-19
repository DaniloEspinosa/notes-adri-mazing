import { useContext, useEffect } from "react";
import "./NoteCard.css"
import { NoteContext } from "../context/note.context";

const NoteCard = (props) => {
  const { note } = props;
  const {updateNote, deleteNote} = useContext(NoteContext)

  const handleInput = (e) => {
    const updatedNote = {...note, title: e.target.value}
    updateNote(updatedNote)
  }

  const handleCheck = (e) => {
    const updatedNote = {...note, marked: !note.marked}
    updateNote(updatedNote)
  }


 
  return (
    <article className="note-card">
      <input type="text" className="card-title" value={note.title} onChange={handleInput}/>
      <input type="checkbox" checked={note.marked} onChange={handleCheck}/>
      <button className="delete-btn" onClick={() => {deleteNote(note.id)}}>-</button>
    </article>
  );
};

export default NoteCard;
