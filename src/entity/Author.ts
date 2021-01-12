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
import { IsString } from 'class-validator';

import { IsNotBlank } from '../lib/classValidator';
import { BookToAuthor } from './BookToAuthor';

export const entityName = 'authors';
@Entity(entityName)
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
	@BeforeUpdate()
	trimStrings() {
		this.name = this.name.trim();
		this.description = this.description.trim();
	}
}
