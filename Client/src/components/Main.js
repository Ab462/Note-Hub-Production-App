import React, { useContext, useState } from 'react'
import Notes from './Notes'
import NoteContext from '../context/NoteContext'
import { useOutletContext } from 'react-router-dom';

export default function Main() {
    const { AddNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: '', description: '' });
    const [showAlert] = useOutletContext();

    const onChange = (e) => {
        const { name, value } = e.target
        setNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        AddNote(note.title, note.description)
        showAlert('Note has been added successfully','success')
        setNote({ title: '', description: '' });

    }

    return (
        <>
            <form action='/' className='form'>
                <h2>Add a Note</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className={`form-control ${note.title.length < 5 && note.title.length > 0 ? 'is-invalid' : note.title.length >= 5 ? 'is-valid' : ''}`} value={note.title} name='title' onChange={onChange} id="title" aria-describedby="titleHelp" minLength={5} required />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        title should be atleast 5 charachters long
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className={`form-control ${note.description.length < 5 && note.description.length > 0 ? 'is-invalid' : note.description.length >= 5 ? 'is-valid' : ''}`}
                        value={note.description} name='description' onChange={onChange} id="description" minLength={5} maxLength={100} required />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        description should be atleast 5 charachters long
                    </div>
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Save Note</button>
            </form>
            <Notes />
        </>

    )
}
