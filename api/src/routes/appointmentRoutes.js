import { Router } from 'express';
import {
  getNoteById,
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/appointment', authenticate);

router.get('/appointment', celebrate(getAllNotesSchema), getAllNotes);

router.get('/appointment/:noteId', celebrate(noteIdSchema), getNoteById);
router.delete('/appointment/:noteId', celebrate(noteIdSchema), deleteNote);

router.post('/appointment', celebrate(createNoteSchema), createNote);

router.patch('/appointment/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
