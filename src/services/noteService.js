const Note = require('../models/Note');

class NoteService {
  static async getAllNotes(userId) {
    try {
      const notes = await Note.find({ owner: userId });
      return notes;
    } catch (error) {
      throw error;
    }
  }

  static async getNoteById(noteId, userId) {
    try {
      const note = await Note.findOne({ _id: noteId, owner: userId });
      return note;
    } catch (error) {
      throw error;
    }
  }

  static async createNote(title, content, userId) {
    try {
      const note = new Note({ title, content, owner: userId });
      await note.save();
      return note;
    } catch (error) {
      throw error;
    }
  }

  static async updateNote(noteId, title, content, userId) {
    try {
      const note = await Note.findOneAndUpdate(
        { _id: noteId, owner: userId },
        { title, content },
        { new: true }
      );
      return note;
    } catch (error) {
      throw error;
    }
  }

  static async deleteNote(noteId, userId) {
    try {
      const note = await Note.findOneAndDelete({ _id: noteId, owner: userId });
      return note;
    } catch (error) {
      throw error;
    }
  }

  static async shareNoteWithUser(noteId, userIdToShareWith) {
    try {
      const note = await Note.findByIdAndUpdate(
        noteId,
        { $addToSet: { sharedWith: userIdToShareWith } },
        { new: true }
      );
      return note;
    } catch (error) {
      throw error;
    }
  }

  static async searchNotes(query, userId) {
    try {
      // Use text indexing or other appropriate method for searching
      const searchResults = await Note.find(
        {
          $or: [
            { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
            { content: { $regex: query, $options: 'i' } }, // Case-insensitive content search
          ],
          $or: [{ owner: userId }, { sharedWith: userId }],
        }
      );

      return searchResults;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NoteService;
