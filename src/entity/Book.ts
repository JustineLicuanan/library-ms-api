import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	OneToMany,
	BeforeUpdate,
} from 'typeorm';
import { IsISBN, IsNumber, IsString } from 'class-validator';

import { IsISBNAlreadyExist, IsNotBlank } from '../lib/classValidator';
import { BookToAuthor } from './BookToAuthor';

export const entityName = 'books';
@Entity(entityName)
export class Book extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsISBN()
	@IsISBNAlreadyExist({
		message: 'ISBN already exist in the database',
	})
	isbn: string;

	@Column()
	@IsString()
	@IsNotBlank('title', { message: 'Title field cannot be blank' })
	title: string;

	@Column()
	@IsString()
	@IsNotBlank('subject', { message: 'Subject field cannot be blank' })
	subject: string;

	@Column()
	@IsString()
	@IsNotBlank('publisher', { message: 'Publisher field cannot be blank' })
	publisher: string;

	@Column()
	@IsString()
	@IsNotBlank('language', { message: 'Language field cannot be blank' })
	language: string;

	@Column()
	@IsNumber()
	number_of_pages: number;

	@OneToMany(() => BookToAuthor, (bookToAuthor) => bookToAuthor.book)
	public book_to_authors!: BookToAuthor[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	@BeforeUpdate()
	trimStrings() {
		this.title = this.title.trim();
		this.subject = this.subject.trim();
		this.publisher = this.publisher.trim();
		this.language = this.language.trim();
	}
}
