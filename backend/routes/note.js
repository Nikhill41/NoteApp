const express = require('express')
const router = express.Router()
const {addNote, getAllNotes,updateNote,deleteNote} = require('../controllers/note')
const verifyToken = require('../middleware/verifyToken')

router.post('/add', verifyToken, addNote)
router.get('/all', verifyToken, getAllNotes)
router.put('/update/:id', verifyToken, updateNote)
router.delete('/delete/:id', verifyToken, deleteNote)

module.exports = router