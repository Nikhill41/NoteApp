const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true})

const Note = mongoose.model('note', NoteSchema)
module.exports = Note