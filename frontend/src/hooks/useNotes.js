import { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { toast } from 'react-toastify'

const useNotes = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchNotes = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/note/all')
            if (response.data.success) {
                setNotes(response.data.notes)
            }
        } catch (error) {
            toast.error("Failed to fetch notes")
        } finally {
            setLoading(false)
        }
    }

    const addNote = async (title, description) => {
        try {
            const response = await axiosInstance.post('/note/add', {title, description})
            if (response.data.success) {
                toast.success("Note added!")
                setNotes(prev => [response.data.note, ...prev])
                return true   // ✅ signal success to close modal
            }
        } catch (error) {
            toast.error("Failed to add note")
            return false
        }
    }

    const updateNote = async (id, title, description) => {
        try {
            const response = await axiosInstance.put(`/note/update/${id}`, {title, description})
            if (response.data.success) {
                toast.success("Note updated!")
                // replace old note with updated note in array
                setNotes(prev => prev.map(note =>
                    note._id === id ? response.data.note : note
                ))
                return true
            }
        } catch (error) {
            toast.error("Failed to update note")
            return false
        }
    }

    const deleteNote = async (id) => {
        try {
            const response = await axiosInstance.delete(`/note/delete/${id}`)
            if (response.data.success) {
                toast.success("Note deleted!")
                // remove deleted note from array
                setNotes(prev => prev.filter(note => note._id !== id))
            }
        } catch (error) {
            toast.error("Failed to delete note")
        }
    }


    return {notes, loading, fetchNotes, addNote,updateNote,deleteNote}
}

export default useNotes