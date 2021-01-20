import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { BookItem } from './BookItem';

@Entity()
@ObjectType()
export class Rack extends BaseEntity {
	@PrimaryColumn('uuid')
	@Field()
	id: string;

	@Column()
	@Field(() => Int)
	number: number;

	@Column('text')
	@Field()
	locationIdentifier: string;

	@OneToMany(() => BookItem, (bookItem) => bookItem.rack)
	@Field(() => [BookItem])
	bookItems: BookItem[];

	@BeforeInsert()
	async genIdAndTrim() {
		this.id = uuidv4();
		this.locationIdentifier = this.locationIdentifier.trim();
	}
}
