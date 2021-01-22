import {
	isISBN,
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';

import { Book } from '../entity/Book';

export const IsIsbnNotExist = (
	forUpdate?: true,
	validationOptions?: ValidationOptions
) => (object: Object, propertyName: string) => {
	registerDecorator({
		name: 'isIsbnNotExist',
		target: object.constructor,
		propertyName,
		...(!!forUpdate && { constraints: ['id'] }),
		options: {
			message: 'isbn already exist',
			...validationOptions,
		},
		validator: {
			async validate(isbn: string, args: ValidationArguments) {
				if (!isISBN(isbn)) return true;
				const book = await Book.findOne({ isbn }, { select: ['id'] });
				return !book || (!!forUpdate && book.id === (args.object as any).id);
			},
		},
	});
};
