import React from "react";
import NoteContext from "../context/NoteContext";
import { useContext } from "react";

export default function NotesItems(props) {
  const { title, description} = props.note;
  const { UpdateNote } = props
  const { DeleteNote } = useContext(NoteContext);
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="title">
              <h5 className="card-title">{title}</h5>
            </div>
            <div className="Icons">
              <i className="fa-solid fa-trash-can" onClick={() => (DeleteNote(props.note._id) )}></i>
              <i className="fa-regular fa-pen-to-square mx-3" onClick={() => (UpdateNote(props.note))}></i>
            </div>
          </div>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  );
}


