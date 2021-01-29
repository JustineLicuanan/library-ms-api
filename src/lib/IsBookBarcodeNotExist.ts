import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';

import { BookItem } from '../entity/BookItem';

export const IsBookBarcodeNotExist = (
	forUpdate?: true,
	validationOptions?: ValidationOptions
) => (object: Object, propertyName: string) => {
	registerDecorator({
		name: 'isBookBarcodeNotExist',
		target: object.constructor,
		propertyName,
		...(!!forUpdate && { constraints: ['id'] }),
		options: {
			message: 'barcode already exist',
			...validationOptions,
		},
		validator: {
			async validate(barcode: string, args: ValidationArguments) {
				const bookItem = await BookItem.findOne(
					{ barcode },
					{ select: ['id'] }
				);
				return (
					!bookItem || (!!forUpdate && bookItem.id === (args.object as any).id)
				);
			},
		},
	});
};
