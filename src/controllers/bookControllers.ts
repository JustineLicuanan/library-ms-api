import { Request, Response } from 'express';

import { handleClassValidatorError } from '../lib/errorHandler';
import { Book } from '../entity/Book';

// Add a book
export const addBook_post = async (req: Request, res: Response) => {
	try {
		const book = Book.create({
			isbn: req.body.isbn,
			title: req.body.title,
			subject: req.body.subject,
			publisher: req.body.publisher,
			language: req.body.language,
			number_of_pages: req.body.number_of_pages,
		});

		// Validate book
		const err = await handleClassValidatorError(book);
		if (err) {
			res.status(400).json(err);
			return;
		}

		// Save new book to database
		await book.save();

		res.status(201).json({
			success: true,
			message: 'Book added successfully',
			book,
		});
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Get all books
export const getAllBooks_get = async (req: Request, res: Response) => {
	try {
		const books = await Book.find();
		res.json(books);
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Get single book
export const getBook_get = async (req: Request, res: Response) => {
	const { isbn } = req.params;
	if (isbn === null || isbn === undefined) {
		res.status(400).json({
			error: true,
			message: 'ISBN cannot be null, or undefined',
		});
		return;
	}

	try {
		const book = await Book.findOne({ isbn });
		if (!book) {
			res.status(404).json({
				error: true,
				message: 'Book not found',
			});
			return;
		}

		res.json(book);
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Update a book
export const updateBook_patch = (req: Request, res: Response) => {
	//
};

// Delete a book
export const deleteBook_delete = async (req: Request, res: Response) => {
	const { isbn } = req.params;
	if (isbn === null || isbn === undefined) {
		res.status(400).json({
			error: true,
			message: 'ISBN cannot be null, or undefined',
		});
		return;
	}

	try {
		const book = await Book.findOne({ isbn });
		if (!book) {
			res.status(404).json({
				error: true,
				message: 'Book not found',
			});
			return;
		}

		// Remove book to database
		await book.remove();

		res.json({
			success: true,
			message: 'Book deleted successfully',
		});
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};
