const noteService = require('../services/noteService');

class NoteController {
  static async getAllNotes(req, res, next) {
    const userId = req.user.id;

    try {
      const notes = await noteService.getAllNotes(userId);
      res.json({ notes });
    } catch (error) {
      next(error);
    }
  }

  static async getNoteById(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const note = await noteService.getNoteById(id, userId);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ note });
    } catch (error) {
      next(error);
    }
  }

  static async createNote(req, res, next) {
    const { title, content } = req.body;
    const userId = req.user.id;

    try {
      const note = await noteService.createNote(title, content, userId);
      res.status(201).json({ note });
    } catch (error) {
      next(error);
    }
  }

  static async updateNote(req, res, next) {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    try {
      const note = await noteService.updateNote(id, title, content, userId);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ note });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNote(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const note = await noteService.deleteNote(id, userId);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ note });
    } catch (error) {
      next(error);
    }
  }

  static async shareNoteWithUser(req, res, next) {
    const { id } = req.params;
    const { userIdToShareWith } = req.body;

    try {
      const note = await noteService.shareNoteWithUser(id, userIdToShareWith);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ note });
    } catch (error) {
      next(error);
    }
  }

  static async searchNotes(req, res, next) {
    const { q } = req.query;
    const userId = req.user.id;
    console.log(req.query)

    try {
        // Use the 'q' parameter to perform the search
        const results = await noteService.searchNotes(q, userId);
        res.json({ results });
    } catch (error) {
        next(error);
    }
    }
}

module.exports = NoteController;
