import {
	isEmail,
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';

import { Member } from '../entity/Member';
import { Librarian } from '../entity/Librarian';

export const IsEmailNotExist = (
	forUpdate?: true,
	validationOptions?: ValidationOptions
) => (object: Object, propertyName: string) => {
	registerDecorator({
		name: 'isEmailNotExist',
		target: object.constructor,
		propertyName,
		constraints: ['id', 'isLibrarian'],
		options: {
			message: 'email already exist',
			...validationOptions,
		},
		validator: {
			async validate(email: string, args: ValidationArguments) {
				if (!isEmail(email)) return true;
				const user = await ((args.object as any).isLibrarian
					? Librarian
					: Member
				).findOne({ email }, { select: ['id'] });
				return !user || (!!forUpdate && user.id === (args.object as any).id);
			},
		},
	});
};
