import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import bcrypt from 'bcryptjs';

import { Member } from '../entity/Member';
import * as ResolverTypes from '../types/AuthResolverTypes';
import { MyContext } from '../types/MyContext';
import { Librarian } from '../entity/Librarian';
import { canRegisterLibrarian } from '../middlewares/canRegisterLibrarian';

@Resolver()
export class AuthResolver {
	@Mutation(() => Member)
	@UseMiddleware(canRegisterLibrarian)
	async register(
		@Arg('input') { isLibrarian, ...input }: ResolverTypes.RegisterInput
	): Promise<Member> {
		return {
			...(await (isLibrarian ? Librarian : Member).create(input).save()),
			isLibrarian,
		} as Member;
	}

	@Mutation(() => Member)
	async login(
		@Arg('input') input: ResolverTypes.LoginInput,
		@Ctx() { req }: MyContext
	): Promise<Member> {
		const user = await (input.isLibrarian ? Librarian : Member).findOne({
			email: input.email,
		});
		if (!user) throw new Error('Email is incorrect');

		const isMatch = await bcrypt.compare(input.password, user.password);
		if (!isMatch) throw new Error('Password is incorrect');

		(req.session as any).user = {
			...user,
			isLibrarian: input.isLibrarian,
		};
		return (req.session as any).user;
	}

	@Query(() => Member, { nullable: true })
	me(@Ctx() { req }: MyContext): Member | undefined {
		return (req.session as any).user
			? {
					...(req.session as any).user,
					dateOfMembership: new Date(
						(req.session as any).user.dateOfMembership
					),
			  }
			: undefined;
	}

	@Mutation(() => Boolean)
	logout(@Ctx() ctx: MyContext): Promise<boolean> {
		return new Promise((res, rej) =>
			ctx.req.session!.destroy((err) => {
				if (err) return rej(false);

				ctx.res.clearCookie('qid');
				return res(true);
			})
		);
	}
}
