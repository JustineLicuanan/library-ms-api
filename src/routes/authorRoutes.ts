import express from 'express';

import * as controller from '../controllers/authorControllers';

// Inits
const router = express.Router();

// Routes
router.post('/', controller.addAuthor_post);
router.get('/', controller.getAllAuthors_get);
router.get('/:id', controller.getAuthor_get);
router.patch('/:id', controller.updateAuthor_patch);
router.delete('/:id', controller.deleteAuthor_delete);

export default router;
