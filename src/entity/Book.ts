import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
	@PrimaryColumn('uuid')
	id: string;

	@Column('text')
	isbn: string;

	@Column('text')
	title: string;

	@Column('text')
	subject: string;

	@Column('text')
	publisher: string;

	@Column('text')
	language: string;

	@Column()
	number_of_pages: number;
}
