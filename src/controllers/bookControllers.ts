import { Request, Response } from 'express';

import { handleBookError } from '../lib/errorHandler';
import Book from '../models/BookModel';

// Add a book
export const addBook_post = async (req: Request, res: Response) => {
	try {
		const book = new Book({
			ISBN: req.body.ISBN,
			title: req.body.title,
			subject: req.body.subject,
			publisher: req.body.publisher,
			language: req.body.language,
			numberOfPages: req.body.numberOfPages,
			authors: req.body.authors,
		});

		// Save new book to database
		await book.save();

		res.status(201).json({
			success: true,
			message: 'Book created successfully',
			book,
		});
	} catch (err) {
		handleBookError(res, err, true);
	}
};

// Get all books
export const getAllBooks_get = (req: Request, res: Response) => {
	//
};

// Get single book
export const getBook_get = (req: Request, res: Response) => {
	//
};

// Update a book
export const updateBook_patch = (req: Request, res: Response) => {
	//
};

// Delete a book
export const deleteBook_delete = (req: Request, res: Response) => {
	//
};
