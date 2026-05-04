import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

// ✅ receives 'noteToEdit' — if present it's edit mode, else add mode
const NoteModal = ({closeModal, addNote, noteToEdit, updateNote}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // ✅ Pre-fill form if editing
    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title)
            setDescription(noteToEdit.description)
        }
    }, [noteToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim()) { toast.error("Title is required"); return }
        if (!description.trim()) { toast.error("Description is required"); return }

        let success
        if (noteToEdit) {
            // Edit mode
            success = await updateNote(noteToEdit._id, title, description)
        } else {
            // Add mode
            success = await addNote(title, description)
        }

        if (success) {
            setTitle("")
            setDescription("")
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50' onClick={closeModal}>
            <div className='card rounded-lg-2 p-8 w-96 shadow-2xl' onClick={(e) => e.stopPropagation()}>
                <h2 className='text-2xl font-bold mb-6 text-slate-800'>
                    {noteToEdit ? "Edit Note ✏️" : "Add New Note 📝"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Note Title'
                        className='input-base w-full mb-4'
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Note Description'
                        className='input-base w-full mb-6 resize-none'
                        rows='4'
                    />
                    <button type="submit" className='w-full btn-primary py-2.5 rounded-md font-semibold transition duration-200'>
                        {noteToEdit ? "Save Changes" : "Add Note"}
                    </button>
                    <button type='button' className='mt-4 w-full text-red-600 hover:text-red-700 text-sm font-medium' onClick={closeModal}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NoteModal