import { Field, InputType, Int } from 'type-graphql';
import { IsISBN, IsUUID } from 'class-validator';

import { IsNotBlank } from '../lib/IsNotBlank';
import { IsIsbnNotExist } from '../lib/IsIsbnNotExist';

@InputType()
export class CreateBookInput {
	@Field()
	@IsISBN()
	@IsIsbnNotExist()
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
	number_of_pages: number;
}

@InputType()
export class UpdateBookInput {
	@Field()
	@IsUUID()
	id: string;

	@Field({ nullable: true })
	@IsISBN()
	@IsIsbnNotExist(true)
	isbn?: string;

	@Field({ nullable: true })
	@IsNotBlank()
	title?: string;

	@Field({ nullable: true })
	@IsNotBlank()
	subject?: string;

	@Field({ nullable: true })
	@IsNotBlank()
	publisher?: string;

	@Field({ nullable: true })
	@IsNotBlank()
	language?: string;

	@Field(() => Int, { nullable: true })
	number_of_pages?: number;
}

@InputType()
export class DeleteBookInput {
	@Field()
	@IsISBN()
	isbn: string;
}
