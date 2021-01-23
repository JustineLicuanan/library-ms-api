import { MiddlewareFn } from 'type-graphql';

import { Librarian } from '../entity/Librarian';
import { MyContext } from '../types/MyContext';

export const canRegisterLibrarian: MiddlewareFn<MyContext> = async (
	{ context, args },
	next
) => {
	if (!args.input.isLibrarian) return next();

	if ((context.req.session as any).user?.isLibrarian) return next();

	if (!(await Librarian.findOne({ select: ['id'] }))) return next();
	throw new Error('Unauthorized');
};
