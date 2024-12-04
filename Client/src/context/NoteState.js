import { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState(props) {
  const [notes, setNotes] = useState([]);
  const host = process.env.REACT_APP_BASE_API_URL
  const Token = localStorage.getItem('Token');

  // Fetching All Notes
  const fetchNotes = async () => {
    // Api Call
    let url = `${host}/notes/fetchallnotes/`;

    const response = await fetch(url, {
      method: "GET",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Token

      },

    });
    const data = await response.json();
    // Setting the response array data to notes array
    setNotes(data);

  };

  // Add a Note
  const AddNote = async (title, description) => {
    //  Api Call
    let url = `${host}/notes/addnote`
    const Response = await fetch(url, {
      method: "POST",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Token
      },
      body: JSON.stringify({ title, description }),
    });
    await Response.json()

    // Add a Note on client side
    const newNote = {
      "title": title,
      "description": description,
    }
    return setNotes(prevNote => prevNote.concat(newNote));

  }

  // Edit Note
  const EditNote = async (id, title, description) => {
    // Api Call 
    let url = `${host}/notes/updatenotes/${id}`
    const Response = await fetch(url, {
      method: "PUT",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Token
      },
      body: JSON.stringify({ title, description }),
    });
    await Response.json();

    // Edit a Note on client side
    let newNote = JSON.parse(JSON.stringify(notes));

    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if (element._id === id) {
        element.title = title;
        element.description = description
        break;
      }

    }
    setNotes(newNote);

  }

  // Deleting a Note
  const DeleteNote = async (id) => {
    // Api Call
    let url = `${host}/notes/deletenote/${id}`
    const Response = await fetch(url, {
      method: "DELETE",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': Token
      },
    });
    const json = await Response.json();
    if (json.success) {
      props.showAlert(json.message, 'success');
    }

    // Delete a Note on client side
    const delNote = notes.filter((element) => { return element._id !== id });
    setNotes(delNote);

  }

  return <NoteContext.Provider value={{ notes, AddNote, EditNote, DeleteNote, fetchNotes }}>{props.children}</NoteContext.Provider>;
}
