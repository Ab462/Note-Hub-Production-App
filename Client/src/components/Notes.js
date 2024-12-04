import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import NotesItems from './NotesItems'
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function Notes() {
    const { notes, fetchNotes, EditNote } = useContext(NoteContext);
    const [Enote, setEnote] = useState({ id: '', etitle: '', edescription: '' });
    const [showAlert] = useOutletContext();
    const ref = useRef(null);
    const modalClose = useRef(null);

    console.log(notes)
    let Navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            Navigate('/login');
            showAlert('Access Denied: You must be logged in to access this page', 'danger')
        } else {
            fetchNotes();
        }
        //eslint-disable-next-line
    }, [])


    const UpdateNote = (currentNote) => {
        ref.current.click();
        // below code for getting the title and description value of current opened note to be seen as placeholder
        setEnote({ etitle: currentNote.title, edescription: currentNote.description, id: currentNote._id });

    }
    const onChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setEnote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));

    }

    const handleUpdate = () => {
        // passing all the required properties to final EditNote Function
        showAlert('Note has been edited Successfully', 'success');
        modalClose.current.click();
        return EditNote(Enote.id, Enote.etitle, Enote.edescription);
    }

    return (
        <>
            <button style={{ display: 'none' }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action='/' className='form'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="titleHelp" value={Enote.etitle} onChange={onChange} name='etitle' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" onChange={onChange} name='edescription' value={Enote.edescription} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={modalClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={Enote.etitle.length < 5 || Enote.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row row-gap-4 my-4'>
                <h2>My Notes</h2>
                {notes.length === 0 && <h6>Your Notes Will Appear Here</h6>}
                {notes.map((element) => {
                    return <NotesItems key={element._id} UpdateNote={UpdateNote} note={element} />
                })}
            </div>
        </>
    )
}
