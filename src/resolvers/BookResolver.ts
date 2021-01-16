import { isInt, isISBN, isString } from 'class-validator';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { Book } from '../entity/Book';
import * as ResolverTypes from '../types/BookResolverTypes';

@Resolver()
export class BookResolver {
	@Mutation(() => Book)
	async createBook(
		@Arg('input', () => ResolverTypes.CreateBookInput)
		input: ResolverTypes.CreateBookInput
	) {
		return await Book.create(input).save();
	}

	@Query(() => [Book])
	async getAllBooks() {
		return await Book.find();
	}

	@Mutation(() => Boolean)
	async updateBook(
		@Arg('input', () => ResolverTypes.UpdateBookInput)
		input: ResolverTypes.UpdateBookInput
	) {
		const bookUpdates = {
			...(isISBN(input.isbn) && { isbn: input.isbn }),
			...(isString(input.title) && { title: input.title }),
			...(isString(input.subject) && { subject: input.subject }),
			...(isString(input.publisher) && { publisher: input.publisher }),
			...(isString(input.language) && { language: input.language }),
			...(isInt(input.number_of_pages) && {
				number_of_pages: input.number_of_pages,
			}),
		};
		return (
			!!Object.keys(bookUpdates).length &&
			!!(await Book.update(input.id, bookUpdates)).affected
		);
	}

	@Mutation(() => Boolean)
	async deleteBook(
		@Arg('input', () => ResolverTypes.DeleteBookInput)
		input: ResolverTypes.DeleteBookInput
	) {
		return !!(await Book.delete(input)).affected;
	}
}
