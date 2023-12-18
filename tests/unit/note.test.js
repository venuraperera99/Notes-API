const NoteController = require('../controllers/noteController');
const NoteService = require('../services/noteService');
const express = require('express');
const supertest = require('supertest');

const app = express();
app.use(express.json());

jest.mock('../services/noteService');

describe('Note Endpoints', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('PUT /api/notes/:id', () => {
    it('should update an existing note by ID for the authenticated user', async () => {
      const userId = 'user123';
      const noteId = 'note456';
      const updatedNote = { title: 'Updated Title', content: 'Updated Content' };

      NoteService.updateNote.mockResolvedValueOnce(updatedNote);

      const response = await supertest(app)
        .put(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${userId}`)
        .send(updatedNote);

      expect(response.status).toBe(200);
      expect(response.body.note).toEqual(updatedNote);
      expect(NoteService.updateNote).toHaveBeenCalledWith(noteId, updatedNote.title, updatedNote.content, userId);
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should delete a note by ID for the authenticated user', async () => {
      const userId = 'user123';
      const noteId = 'note456';
      const deletedNote = { title: 'Deleted Note', content: 'Note content' };

      NoteService.deleteNote.mockResolvedValueOnce(deletedNote);

      const response = await supertest(app)
        .delete(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.note).toEqual(deletedNote);
      expect(NoteService.deleteNote).toHaveBeenCalledWith(noteId, userId);
    });
  });

  describe('POST /api/notes/:id/share', () => {
    it('should share a note with another user for the authenticated user', async () => {
      const userId = 'user123';
      const noteId = 'note456';
      const userIdToShareWith = 'user789';
      const sharedNote = { title: 'Shared Note', content: 'Note content', sharedWith: [userIdToShareWith] };

      NoteService.shareNoteWithUser.mockResolvedValueOnce(sharedNote);

      const response = await supertest(app)
        .post(`/api/notes/${noteId}/share`)
        .set('Authorization', `Bearer ${userId}`)
        .send({ userIdToShareWith });

      expect(response.status).toBe(200);
      expect(response.body.note).toEqual(sharedNote);
      expect(NoteService.shareNoteWithUser).toHaveBeenCalledWith(noteId, userIdToShareWith);
    });
  });

  describe('GET /api/search?q=:query', () => {
    it('should search for notes based on keywords for the authenticated user', async () => {
      const userId = 'user123';
      const query = 'Keyword';

      const searchResults = [{ title: 'Note 1', content: 'Content 1' }, { title: 'Note 2', content: 'Content 2' }];

      NoteService.searchNotes.mockResolvedValueOnce(searchResults);

      const response = await supertest(app)
        .get(`/api/search?q=${query}`)
        .set('Authorization', `Bearer ${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.results).toEqual(searchResults);
      expect(NoteService.searchNotes).toHaveBeenCalledWith(query, userId);
    });
  });
});
