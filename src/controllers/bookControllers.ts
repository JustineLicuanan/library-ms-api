import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { areAllArrayElementsIs } from '../lib/validator';
import { handleClassValidatorError } from '../lib/errorHandler';
import { Book, entityName as BOOK_TABLE_NAME } from '../entity/Book';
import { Author } from '../entity/Author';
import {
	BookToAuthor,
	entityName as BOOK_TO_AUTHOR_TABLE_NAME,
} from '../entity/BookToAuthor';

// Add a book
export const addBook_post = async (req: Request, res: Response) => {
	// Check if all authors array elements are integers
	const { authors: bodyAuthors } = req.body;
	const authorPass = areAllArrayElementsIs(bodyAuthors, Number.isInteger);
	if (!authorPass) {
		res.json({
			error: true,
			message: 'Authors field is required, and must be an array of integers',
		});
		return;
	}

	try {
		// Check if there are missing authors
		const authors = await Author.findByIds(bodyAuthors);
		const missingAuthors = bodyAuthors.length - authors.length;
		if (missingAuthors) {
			res.json({
				error: true,
				message: `${
					missingAuthors > 1 ? `${missingAuthors} authors` : 'Author'
				} not found`,
			});
			return;
		}

		// Create book instance
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
		await Promise.all(
			authors.map(async (author) => {
				const bookToAuthor = BookToAuthor.create({
					bookId: book.id,
					authorId: author.id,
				});
				return await bookToAuthor.save();
			})
		);

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
		const books = await Book.find({
			relations: ['book_to_authors', 'book_to_authors.author'],
		});
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
	if (!isbn) {
		res.status(400).json({
			error: true,
			message: 'ISBN cannot be null, or undefined',
		});
		return;
	}

	try {
		const book = await Book.findOne(
			{ isbn },
			{ relations: ['book_to_authors', 'book_to_authors.author'] }
		);
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
export const updateBook_patch = async (req: Request, res: Response) => {
	const { isbn } = req.params;
	if (!isbn) {
		res.status(400).json({
			error: true,
			message: 'ISBN cannot be null, or undefined',
		});
		return;
	}

	try {
		const book = await Book.findOne(
			{ isbn },
			{
				select: [
					'id',
					'isbn',
					'title',
					'subject',
					'publisher',
					'language',
					'number_of_pages',
				],
			}
		);
		if (!book) {
			res.status(404).json({
				error: true,
				message: 'Book not found',
			});
			return;
		}

		// Update book properties
		book.isbn = req.body.isbn || book.isbn;
		book.title = req.body.title || book.title;
		book.subject = req.body.subject || book.subject;
		book.publisher = req.body.publisher || book.publisher;
		book.language = req.body.language || book.language;
		book.number_of_pages = req.body.number_of_pages || book.number_of_pages;

		// Validate book
		let err;
		if (req.body.isbn !== isbn && req.body.isbn) {
			err = await handleClassValidatorError(book);
		} else {
			book.isbn = undefined!;
			err = await handleClassValidatorError(book, true);
			book.isbn = req.body.isbn || book.isbn;
		}

		// Check if there are validation errors
		if (err) {
			res.status(400).json(err);
			return;
		}

		// Create book updates object
		const bookUpdates = {
			...(!!req.body.isbn && req.body.isbn !== isbn && { isbn: req.body.isbn }),
			...(!!req.body.title && { title: req.body.title }),
			...(!!req.body.subject && { subject: req.body.subject }),
			...(!!req.body.publisher && { publisher: req.body.publisher }),
			...(!!req.body.language && { language: req.body.language }),
			...(!!req.body.number_of_pages && {
				number_of_pages: req.body.number_of_pages,
			}),
		};

		// Update book to database
		if (Object.keys(bookUpdates).length) {
			await Book.update(book.id, bookUpdates);
		}

		res.json({
			success: true,
			message: 'Book updated successfully',
			book,
		});
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Delete a book
export const deleteBook_delete = async (req: Request, res: Response) => {
	const { isbn } = req.params;
	if (!isbn) {
		res.status(400).json({
			error: true,
			message: 'ISBN cannot be null, or undefined',
		});
		return;
	}

	try {
		const book = await Book.findOne({ isbn }, { select: ['id'] });
		if (!book) {
			res.status(404).json({
				error: true,
				message: 'Book not found',
			});
			return;
		}

		// Delete book to author relations
		await getConnection()
			.createQueryBuilder()
			.delete()
			.from(BookToAuthor)
			.where(`${BOOK_TO_AUTHOR_TABLE_NAME}."bookId" = :id`, { id: book.id })
			.execute();

		// Remove book to database
		await getConnection()
			.createQueryBuilder()
			.delete()
			.from(Book)
			.where(`${BOOK_TABLE_NAME}.id = :id`, { id: book.id })
			.execute();

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
