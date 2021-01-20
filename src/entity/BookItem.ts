import { Field, Float, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import * as Types from '../types/BookItemTypes';
import { Book } from './Book';
import { Rack } from './Rack';

@Entity()
@ObjectType()
export class BookItem extends Book {
	@Column({ default: false })
	@Field()
	isReferenceOnly: boolean;

	@Column()
	@Field()
	borrowed: Date;

	@Column()
	@Field()
	dueDate: Date;

	@Column()
	@Field(() => Float)
	price: number;

	@Column('text', { default: Types.BookFormat.HARDCOVER })
	@Field(() => Types.BookFormat)
	format: Types.BookFormat;

	@Column('text', { default: Types.BookStatus.AVAILABLE })
	@Field(() => Types.BookStatus)
	status: Types.BookStatus;

	@Column()
	@Field()
	dateOfPurchase: Date;

	@Column()
	@Field()
	publicationDate: Date;

	@ManyToOne(() => Rack, (rack) => rack.bookItems)
	@Field(() => Rack)
	rack: Rack;
}
