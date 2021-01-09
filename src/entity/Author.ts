import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	ManyToMany,
} from 'typeorm';
import { IsString } from 'class-validator';

import { IsNotBlank } from '../lib/validator';
import { Book } from './Book';

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

	@ManyToMany(() => Book, (book) => book.authors)
	books: Book[];

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
