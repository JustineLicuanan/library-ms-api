import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	OneToMany,
} from 'typeorm';
import { IsString } from 'class-validator';

import { IsNotBlank } from '../lib/validator';
import { BookToAuthor } from './BookToAuthor';

@Entity('authors')
export class Author extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsString()
	@IsNotBlank('name', { message: 'Name field cannot be blank' })
	name: string;

	@Column()
	@IsString()
	@IsNotBlank('description', { message: 'Description field cannot be blank' })
	description: string;

	@OneToMany(() => BookToAuthor, (bookToAuthor) => bookToAuthor.author)
	public book_to_authors!: BookToAuthor[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	trimStrings() {
		this.name = this.name.trim();
		this.description = this.description.trim();
	}
}
