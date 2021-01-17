import { Field, Int, ObjectType } from 'type-graphql';
import {
	Entity,
	PrimaryColumn,
	Column,
	BaseEntity,
	BeforeInsert,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Author } from './Author';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
	@PrimaryColumn('uuid')
	@Field()
	id: string;

	@Column('text')
	@Field()
	isbn: string;

	@Column('text')
	@Field()
	title: string;

	@Column('text')
	@Field()
	subject: string;

	@Column('text')
	@Field()
	publisher: string;

	@Column('text')
	@Field()
	language: string;

	@Column()
	@Field(() => Int)
	number_of_pages: number;

	@ManyToMany(() => Author, (author) => author.books)
	@JoinTable()
	@Field(() => [Author])
	authors: Author[];

	@BeforeInsert()
	genIdAndTrim() {
		this.id = uuidv4();
		this.title = this.title.trim();
		this.subject = this.subject.trim();
		this.publisher = this.publisher.trim();
		this.language = this.language.trim();
	}
}
