import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';

import { Book } from '../entity/Book';

@ValidatorConstraint({ async: true })
export class IsISBNAlreadyExistConstraint
	implements ValidatorConstraintInterface {
	validate = (isbn: string, args: ValidationArguments) =>
		Book.findOne({ isbn }).then((book) => !book);
}

export const IsISBNAlreadyExist = (validationOptions?: ValidationOptions) => (
	object: Object,
	propertyName: string
) => {
	registerDecorator({
		target: object.constructor,
		propertyName: propertyName,
		options: validationOptions,
		constraints: [],
		validator: IsISBNAlreadyExistConstraint,
	});
};

export const IsNotBlank = (
	property: string,
	validationOptions?: ValidationOptions
) => (object: Object, propertyName: string) => {
	registerDecorator({
		name: 'isNotBlank',
		target: object.constructor,
		propertyName: propertyName,
		constraints: [property],
		options: validationOptions,
		validator: {
			validate: (value: any) =>
				typeof value === 'string' && !!value.trim().length,
		},
	});
};
