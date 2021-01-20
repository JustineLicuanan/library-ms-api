import { Field, Int, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity } from 'typeorm';

import { Account } from './Account';

@Entity()
@ObjectType()
export class Member extends Account {
	@CreateDateColumn()
	@Field()
	dateOfMembership: Date;

	@Column({ default: 0 })
	@Field(() => Int)
	totalBooksCheckedout: number;
}
