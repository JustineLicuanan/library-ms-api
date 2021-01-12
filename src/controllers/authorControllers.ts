import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import isInt from 'validator/lib/isInt';

import { handleClassValidatorError } from '../lib/errorHandler';
import { Author, entityName as AUTHOR_TABLE_NAME } from '../entity/Author';

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
		const author = await Author.findOne(id, {
			select: ['id', 'name', 'description'],
		});
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

		// Create author updates object
		const authorUpdates = {
			...(!!req.body.name && { name: req.body.name }),
			...(!!req.body.description && { description: req.body.description }),
		};

		// Update author to database
		if (Object.keys(authorUpdates).length) {
			await Author.update(author.id, authorUpdates);
		}

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
		const author = await Author.findOne(id, { select: ['id'] });
		if (!author) {
			res.status(404).json({
				error: true,
				message: 'Author not found',
			});
			return;
		}

		// Remove author to database
		await getConnection()
			.createQueryBuilder()
			.delete()
			.from(Author)
			.where(`${AUTHOR_TABLE_NAME}.id = :id`, { id: author.id })
			.execute();

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
