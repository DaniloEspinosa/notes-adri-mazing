import React, { useContext, useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { NoteContext } from "../context/note.context";
import NoteCard from "../components/NoteCard";
import "./NotePage.css";
import CreateNote from "../components/CreateNote";

const NotesPage = () => {
  const { notes, getNotes, hasError, hasLoaded, deleteNote } = useContext(NoteContext);

  useEffect(() => {
    getNotes();
  }, [deleteNote]);

  const noteCards = notes.map((note) => {
    return (
      <li key={note.id}>
        <NoteCard note={note} />
      </li>
    );
  });

  return (
    <>
      <HeaderComponent></HeaderComponent>
      <section id="note-page">
        <h2>Notes</h2>
        <ul className="note-list">
          <li>
            <CreateNote />
          </li>
          {!hasError ? (
            hasLoaded ? (
              noteCards
            ) : (
              <h2>Cargando...</h2>
            )
          ) : (
            <h2>Error al cargar las notas de la API</h2>
          )}
        </ul>
      </section>
    </>
  );
};

export default NotesPage;
