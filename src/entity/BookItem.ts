import { Field, Float, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Book } from './Book';
import * as Types from '../graphql-types/BookItemTypes';

@Entity()
@ObjectType()
export class BookItem extends Book {
	@Column('text', { unique: true })
	@Field()
	barcode: string;

	@Column()
	@Field()
	isReferenceOnly: boolean;

	@Column({ nullable: true })
	@Field({ nullable: true })
	borrowed?: Date;

	@Column({ nullable: true })
	@Field({ nullable: true })
	dueDate?: Date;

	@Column('numeric', { precision: 2 })
	@Field(() => Float)
	price: number;

	@Column('text')
	@Field(() => Types.BookFormat)
	format: Types.BookFormat;

	@Column('text')
	@Field(() => Types.BookStatus)
	status: Types.BookStatus;

	@Column()
	@Field()
	dateOfPurchase: Date;

	@Column()
	@Field()
	publicationDate: Date;
}
