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
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50' onClick={closeModal}>
            <div className='bg-white p-8 rounded-2xl shadow-2xl w-96' onClick={(e) => e.stopPropagation()}>
                {/* ✅ Title changes based on mode */}
                <h2 className='text-2xl font-bold mb-6 text-gray-800'>
                    {noteToEdit ? "Edit Note ✏️" : "Add New Note 📝"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Note Title'
                        className='border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Note Description'
                        className='border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none'
                        rows='4'
                    />
                    <button type="submit" className='w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200'>
                        {noteToEdit ? "Save Changes" : "Add Note"}
                    </button>
                    <button type='button' className='mt-4 w-full text-red-500 hover:underline' onClick={closeModal}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NoteModal