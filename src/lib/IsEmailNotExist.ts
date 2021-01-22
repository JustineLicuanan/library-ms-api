import {
	isEmail,
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';

import { Member } from '../entity/Member';

export const IsEmailNotExist = (
	forUpdate?: true,
	validationOptions?: ValidationOptions
) => (object: Object, propertyName: string) => {
	registerDecorator({
		name: 'isEmailNotExist',
		target: object.constructor,
		propertyName,
		...(!!forUpdate && { constraints: ['id'] }),
		options: {
			message: 'email already exist',
			...validationOptions,
		},
		validator: {
			async validate(email: string, args: ValidationArguments) {
				if (!isEmail(email)) return true;
				const member = await Member.findOne({ email }, { select: ['id'] });
				return (
					!member || (!!forUpdate && member.id === (args.object as any).id)
				);
			},
		},
	});
};
