import express from 'express';

import * as controller from '../controllers/bookControllers';

// Inits
const router = express.Router();

// Routes
router.post('/', controller.addBook_post);
router.get('/', controller.getAllBooks_get);
router.get('/:isbn', controller.getBook_get);
router.patch('/:isbn', controller.updateBook_patch);
router.delete('/:isbn', controller.deleteBook_delete);

export default router;
