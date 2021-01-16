import { Field, Int, ObjectType } from 'type-graphql';
import {
	Entity,
	PrimaryColumn,
	Column,
	BaseEntity,
	BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

	@BeforeInsert()
	genIdAndTrim() {
		this.id = uuidv4();
		this.title = this.title.trim();
		this.subject = this.subject.trim();
		this.publisher = this.publisher.trim();
		this.language = this.language.trim();
	}
}
