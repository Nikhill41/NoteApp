const Note = require('../model/notemodel')

const addNote = async (req, res) => {
    try {
        const {title, description} = req.body
        if (!title || !description) {
            return res.status(400).json({success: false, message: "Title and description are required"})
        }
        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        })
        await newNote.save()
        return res.status(200).json({success: true, message: "Note added successfully", note: newNote})
    } catch (error) {
        console.log("addNote error:", error)
        return res.status(500).json({success: false, message: "Server error"})
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({userId: req.user.id}).sort({_id: -1})
        return res.status(200).json({success: true, notes})
    } catch (error) {
        console.log("getAllNotes error:", error)
        return res.status(500).json({success: false, message: "Server error"})
    }
}


const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({_id: req.params.id, userId: req.user.id})

        if (!note) {
            return res.status(404).json({success: false, message: "Note not found"})
        }

        return res.status(200).json({success: true, message: "Note deleted"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"})
    }
}



// ✅ Update note by ID
const updateNote = async (req, res) => {
    try {
        const {title, description} = req.body
        const note = await Note.findOne({_id: req.params.id, userId: req.user.id})

        if (!note) {
            return res.status(404).json({success: false, message: "Note not found"})
        }

        note.title = title || note.title
        note.description = description || note.description
        await note.save()

        return res.status(200).json({success: true, message: "Note updated", note})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error"})
    }
}


module.exports = {addNote, getAllNotes,updateNote,deleteNote}