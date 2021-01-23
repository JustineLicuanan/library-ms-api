import { Field, Int, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity } from 'typeorm';

import { Account } from './Account';

@Entity()
@ObjectType()
export class Member extends Account {
	@Field({ nullable: true })
	isLibrarian?: true;

	@CreateDateColumn()
	@Field()
	dateOfMembership: Date;

	@Column({ default: 0, nullable: false })
	@Field(() => Int, { nullable: true })
	totalBooksCheckedout?: number;
}
