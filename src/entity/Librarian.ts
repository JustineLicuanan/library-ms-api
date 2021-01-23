import { Field, ObjectType } from 'type-graphql';
import { CreateDateColumn, Entity } from 'typeorm';

import { Account } from './Account';

@Entity()
@ObjectType()
export class Librarian extends Account {
	@CreateDateColumn()
	@Field()
	dateOfMembership: Date;
}
