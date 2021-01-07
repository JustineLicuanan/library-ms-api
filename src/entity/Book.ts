import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	Unique,
} from 'typeorm';
import { IsISBN } from 'class-validator';

@Entity('books')
@Unique(['ISBN'])
export class Book extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsISBN()
	ISBN: string;

	@Column()
	title: string;

	@Column()
	subject: string;

	@Column()
	publisher: string;

	@Column()
	language: string;

	@Column()
	numberOfPages: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
