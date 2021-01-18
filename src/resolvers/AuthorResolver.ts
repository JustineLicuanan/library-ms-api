import { isString } from 'class-validator';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { Author } from '../entity/Author';
import * as ResolverTypes from '../types/AuthorResolverTypes';

@Resolver()
export class AuthorResolver {
	@Mutation(() => ResolverTypes.AddAuthorObject)
	async addAuthor(
		@Arg('input', () => ResolverTypes.AddAuthorInput)
		input: ResolverTypes.AddAuthorInput
	) {
		return await Author.create(input).save();
	}

	@Query(() => [Author])
	async getAllAuthors() {
		return await Author.find({ relations: ['books'] });
	}

	@Mutation(() => Boolean)
	async updateAuthor(
		@Arg('input', () => ResolverTypes.UpdateAuthorInput)
		input: ResolverTypes.UpdateAuthorInput
	) {
		const authorUpdates = {
			...(isString(input.name) && { name: input.name }),
			...(isString(input.description) && { description: input.description }),
		};
		return (
			!!Object.keys(authorUpdates).length &&
			!!(await Author.update(input.id, authorUpdates)).affected
		);
	}

	@Mutation(() => Boolean)
	async deleteAuthor(
		@Arg('input', () => ResolverTypes.DeleteAuthorInput)
		input: ResolverTypes.DeleteAuthorInput
	) {
		return !!(await Author.delete(input)).affected;
	}
}
