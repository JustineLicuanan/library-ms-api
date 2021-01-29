import { PrimaryColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class Book extends BaseEntity {
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
	numberOfPages: number;

	@BeforeInsert()
	genId() {
		this.id = uuidv4();
	}

	@BeforeInsert()
	trimStrings() {
		this.title = this.title.trim();
		this.subject = this.subject.trim();
		this.publisher = this.publisher.trim();
		this.language = this.language.trim();
	}
}
