import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { Member } from '../entity/Member';
import * as ResolverTypes from '../types/AuthResolverTypes';
import { MyContext } from '../types/MyContext';

@Resolver()
export class AuthResolver {
	@Mutation(() => Member)
	async register(
		@Arg('input') input: ResolverTypes.RegisterInput
	): Promise<Member> {
		return await Member.create(input).save();
	}

	@Mutation(() => Member)
	async login(
		@Arg('input') input: ResolverTypes.LoginInput,
		@Ctx() { req }: MyContext
	): Promise<Member> {
		const member = await Member.findOne({ email: input.email });
		if (!member) throw new Error('Email is incorrect');

		const isMatch = await bcrypt.compare(input.password, member.password);
		if (!isMatch) throw new Error('Password is incorrect');

		(req.session as any).user = member;
		return member;
	}

	@Query(() => Member, { nullable: true })
	async me(@Ctx() { req }: MyContext): Promise<Member | undefined> {
		return (req.session as any).user
			? {
					...(req.session as any).user,
					...(!!(req.session as any).user.dateOfMembership && {
						dateOfMembership: new Date(
							(req.session as any).user.dateOfMembership
						),
					}),
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
