import { Field, ObjectType } from 'type-graphql';
import {
	Entity,
	PrimaryColumn,
	Column,
	BaseEntity,
	BeforeInsert,
	ManyToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Book } from './Book';

@Entity()
@ObjectType()
export class Author extends BaseEntity {
	@PrimaryColumn('uuid')
	@Field()
	id: string;

	@Column('text')
	@Field()
	name: string;

	@Column('text')
	@Field()
	description: string;

	@ManyToMany(() => Book, (book) => book.authors)
	books: Book[];

	@BeforeInsert()
	genIdAndTrim() {
		this.id = uuidv4();
		this.name = this.name.trim();
		this.description = this.description.trim();
	}
}
