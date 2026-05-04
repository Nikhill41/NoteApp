import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import NoteGrid from '../components/NoteGrid'
import ConfirmModal from '../components/ConfirmModal'
import ViewNoteModal from '../components/ViewNoteModal'
import useNotes from '../hooks/useNotes'
import { useAuth } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedNote, setSelectedNote] = useState(null)
    const [noteToDelete, setNoteToDelete] = useState(null)
    const [viewNote, setViewNote] = useState(null)
    const { user } = useAuth()
    const navigate = useNavigate()
    const { notes, loading, fetchNotes, addNote, updateNote, deleteNote } = useNotes()

    useEffect(() => {
        if (!user) navigate('/login')
        else fetchNotes()
    }, [user])

    const handleEdit = (note) => {
        setViewNote(null)
        setSelectedNote(note)
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
        setSelectedNote(null)
    }

    const handleViewNote = (note) => {
        setViewNote(note)
    }

    // ✅ Step 1: user clicks delete → store note → open confirm modal
    const handleDeleteClick = (note) => {
        setNoteToDelete(note)
    }

    // ✅ Step 2: user confirms → actually delete
    const handleConfirmDelete = async () => {
        await deleteNote(noteToDelete._id)
        setNoteToDelete(null)
        setViewNote(null)
    }

    // ✅ Step 3: user cancels → close confirm modal
    const handleCancelDelete = () => {
        setNoteToDelete(null)
    }

    const handleAddNote = async (title, description) => {
        const success = await addNote(title, description)
        if (success) handleClose()
    }

    const handleUpdateNote = async (id, title, description) => {
        const success = await updateNote(id, title, description)
        if (success) handleClose()
    }

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className='bg-slate-50 min-h-screen flex flex-col pt-16'>
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

            <div className='app-container pt-8 pb-2'>
                <h1 className='text-3xl font-bold text-slate-800'>My Notes</h1>
                <p className='text-sm text-slate-600 mt-1'>
                    {searchQuery
                        ? `${filteredNotes.length} result(s) for "${searchQuery}"`
                        : `${notes.length} ${notes.length === 1 ? "note" : "notes"}`
                    }
                </p>
            </div>

            <NoteGrid
                notes={filteredNotes}
                loading={loading}
                searchQuery={searchQuery}
                onClear={() => setSearchQuery("")}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onView={handleViewNote}
            />

            <button
                onClick={() => { setSelectedNote(null); setModalOpen(true) }}
                className='fixed right-6 bottom-6 text-3xl btn-primary
                font-bold w-14 h-14 rounded-full shadow-lg
                hover:shadow-xl hover:scale-110 transition-all duration-200
                flex items-center justify-center'>
                +
            </button>

            {/* Note Add/Edit Modal */}
            {isModalOpen && (
                <NoteModal
                    closeModal={handleClose}
                    addNote={handleAddNote}
                    updateNote={handleUpdateNote}
                    noteToEdit={selectedNote}
                />
            )}

            {/* ✅ Confirm Delete Modal */}
            {noteToDelete && (
                <ConfirmModal
                    noteTitle={noteToDelete.title}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {/* View Full Note Modal */}
            {viewNote && (
                <ViewNoteModal
                    note={viewNote}
                    onClose={() => setViewNote(null)}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            )}
        </div>
    )
}

export default Home