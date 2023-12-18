const express = require('express');
const NoteController = require('../controllers/noteController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const router = express.Router();

// Note routes requiring authentication
router.use(authenticationMiddleware);

// Search notes by text value 
router.get('/search', NoteController.searchNotes);

// Get a note by ID
router.get('/:id', NoteController.getNoteById);

// Get all notes
router.get('/', NoteController.getAllNotes);

// Create a new note
router.post('/', NoteController.createNote);

// Update a note by ID
router.put('/:id', NoteController.updateNote);

// Delete a note by ID
router.delete('/:id', NoteController.deleteNote);

// Share a note with another user
router.post('/:id/share', NoteController.shareNoteWithUser);

module.exports = router;
