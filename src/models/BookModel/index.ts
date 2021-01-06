import mongoose from 'mongoose';
import isISBN from 'validator/lib/isISBN';

import { hasAtLeastOneElement } from '../../lib/validator';
import { IBook } from '../../types/BookType';
import AuthorSchema from './AuthorSchema';

// Inits
const Schema = mongoose.Schema;

// Create book schema
const BookSchema = new Schema(
	{
		ISBN: {
			type: String,
			unique: true,
			validate: [isISBN, 'ISBN must be valid'],
			required: [true, 'ISBN field is required'],
		},
		title: {
			type: String,
			trim: true,
			required: [true, 'Title field is required'],
		},
		subject: {
			type: String,
			trim: true,
			required: [true, 'Subject field is required'],
		},
		publisher: {
			type: String,
			trim: true,
			required: [true, 'Publisher field is required'],
		},
		language: {
			type: String,
			trim: true,
			required: [true, 'Language field is required'],
		},
		numberOfPages: {
			type: Number,
			required: [true, 'Number of pages field is required'],
		},
		authors: {
			type: [AuthorSchema],
			validate: [hasAtLeastOneElement, 'Book must have atleast 1 author'],
		},
	},
	{ timestamps: true }
);

// Create book model
const BookModel = mongoose.model<IBook>('book', BookSchema);

export default BookModel;
