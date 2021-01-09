import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from 'class-validator';

import { Book } from './Book';
import { Author } from './Author';

@Entity('books_to_authors')
export class BookToAuthor {
	@PrimaryGeneratedColumn()
	public book_to_author_id!: number;

	@Column()
	@IsNumber()
	public bookId!: number;

	@Column()
	@IsNumber()
	public authorId!: number;

	@ManyToOne(() => Book, (book) => book.book_to_authors)
	public book!: Book;

	@ManyToOne(() => Author, (author) => author.book_to_authors)
	public author!: Author;
}
