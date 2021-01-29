import { IsISBN } from 'class-validator';
import { Field, Float, InputType, Int } from 'type-graphql';

import { IsBookBarcodeNotExist } from '../lib/IsBookBarcodeNotExist';
import { IsNotBlank } from '../lib/IsNotBlank';
import * as Types from './BookItemTypes';

@InputType()
export class AddBookItemInput {
	@Field()
	@IsNotBlank()
	@IsISBN()
	isbn: string;

	@Field()
	@IsNotBlank()
	title: string;

	@Field()
	@IsNotBlank()
	subject: string;

	@Field()
	@IsNotBlank()
	publisher: string;

	@Field()
	@IsNotBlank()
	language: string;

	@Field(() => Int)
	numberOfPages: number;

	@Field()
	@IsNotBlank()
	@IsBookBarcodeNotExist()
	barcode: string;

	@Field()
	isReferenceOnly: boolean;

	@Field({ nullable: true })
	borrowed?: Date;

	@Field({ nullable: true })
	dueDate?: Date;

	@Field(() => Float)
	price: number;

	@Field(() => Types.BookFormat)
	format: Types.BookFormat;

	@Field(() => Types.BookStatus)
	status: Types.BookStatus;

	@Field()
	dateOfPurchase: Date;

	@Field()
	publicationDate: Date;
}

@InputType()
export class DeleteBookItemInput {
	@Field()
	@IsNotBlank()
	barcode: string;
}

@InputType()
export class GetBookItemInput {
	@Field()
	@IsNotBlank()
	barcode: string;
}
