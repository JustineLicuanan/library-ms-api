import {
	Entity,
	Column,
	ManyToOne,
	PrimaryGeneratedColumn,
	BaseEntity,
} from 'typeorm';
import { IsNumber } from 'class-validator';

import { Book } from './Book';
import { Author } from './Author';

export const entityName = 'books_to_authors';
@Entity(entityName)
export class BookToAuthor extends BaseEntity {
	@PrimaryGeneratedColumn()
	public book_to_author_id!: number;

	@Column({ select: false })
	@IsNumber()
	public bookId!: number;

	@Column({ select: false })
	@IsNumber()
	public authorId!: number;

	@ManyToOne(() => Book, (book) => book.book_to_authors)
	public book!: Book;

	@ManyToOne(() => Author, (author) => author.book_to_authors)
	public author!: Author;
}
