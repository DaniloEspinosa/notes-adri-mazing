import { createContext, useState } from "react";

const NoteContext = createContext();

// const API_URL = "https://ca64391896ef865e936a.free.beeceptor.com/api/notes/";

function NoteProviderWrapper(props) {
  const [notes, setNotes] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const getNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data.reverse());
      setHasError(false);
      setHasLoaded(true);
    } catch (error) {
      console.log(error);
      setHasError(true);
    }
  };

  const addNote = async (newNote) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newNote),
      });
      setNotes([newNote, ...notes]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}${id}`, {
        method: "DELETE",
      });
      setNotes([...notes]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== updatedNote.id) return note;
      return updatedNote;
    });

    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        getNotes,
        hasError,
        hasLoaded,
        setNotes,
        updateNote,
        addNote,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export { NoteContext, NoteProviderWrapper };
