import { Request, Response } from 'express';
import isInt from 'validator/lib/isInt';

import { handleClassValidatorError } from '../lib/errorHandler';
import { Author } from '../entity/Author';

// Add an author
export const addAuthor_post = async (req: Request, res: Response) => {
	try {
		const author = Author.create({
			name: req.body.name,
			description: req.body.description,
		});

		// Validate author
		const err = await handleClassValidatorError(author);
		if (err) {
			res.status(400).json(err);
			return;
		}

		// Save new author to database
		await author.save();

		res.status(201).json({
			success: true,
			message: 'Author added successfully',
			author,
		});
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Get all authors
export const getAllAuthors_get = async (req: Request, res: Response) => {
	try {
		const authors = await Author.find();
		res.json(authors);
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Get single author
export const getAuthor_get = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!isInt(id)) {
		res.status(400).json({
			error: true,
			message: 'ID must be an integer',
		});
		return;
	}

	try {
		const author = await Author.findOne(id);
		if (!author) {
			res.status(404).json({
				error: true,
				message: 'Author not found',
			});
			return;
		}

		res.json(author);
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Update an author
export const updateAuthor_patch = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!isInt(id)) {
		res.status(400).json({
			error: true,
			message: 'ID must be an integer',
		});
		return;
	}

	try {
		const author = await Author.findOne(id);
		if (!author) {
			res.status(404).json({
				error: true,
				message: 'Author not found',
			});
			return;
		}

		// Update author properties
		author.name = req.body.name || author.name;
		author.description = req.body.description || author.description;

		// Validate author
		const err = await handleClassValidatorError(author);
		if (err) {
			res.status(400).json(err);
			return;
		}

		// Re-save author to database
		await author.save();

		res.json({
			success: true,
			message: 'Author updated successfully',
			author,
		});
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};

// Delete an author
export const deleteAuthor_delete = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!isInt(id)) {
		res.status(400).json({
			error: true,
			message: 'ID must be an integer',
		});
		return;
	}

	try {
		const author = await Author.findOne(id);
		if (!author) {
			res.status(404).json({
				error: true,
				message: 'Author not found',
			});
			return;
		}

		// Remove author to database
		await author.remove();

		res.json({
			success: true,
			message: 'Author deleted successfully',
		});
	} catch (err) {
		res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
};
