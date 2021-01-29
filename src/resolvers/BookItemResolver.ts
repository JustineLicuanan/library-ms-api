import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import { BookItem } from '../entity/BookItem';
import * as ResolverTypes from '../graphql-types/BookItemResolverTypes';
import { isAuth } from '../middlewares/isAuth';

@Resolver()
export class BookItemResolver {
	@Mutation(() => BookItem)
	@UseMiddleware(isAuth)
	async addBookItem(
		@Arg('input') input: ResolverTypes.AddBookItemInput
	): Promise<BookItem> {
		return await BookItem.create(input).save();
	}

	@Query(() => BookItem, { nullable: true })
	async getBookItem(
		@Arg('input') input: ResolverTypes.GetBookItemInput
	): Promise<BookItem | undefined> {
		return await BookItem.findOne(input);
	}

	@Query(() => [BookItem])
	async getAllBookItems(): Promise<BookItem[]> {
		return await BookItem.find();
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteBookItem(
		@Arg('input') input: ResolverTypes.DeleteBookItemInput
	): Promise<boolean> {
		return !!(await BookItem.delete(input)).affected;
	}
}
