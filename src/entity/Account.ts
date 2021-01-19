import { ObjectType, Field, Int } from 'type-graphql';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import * as Types from '../types/AccountTypes';

@Entity()
@ObjectType()
export class Account extends BaseEntity {
	@PrimaryColumn('uuid')
	@Field()
	id: string;

	@Column('text', { default: Types.AccountRole.MEMBER })
	@Field(() => Types.AccountRole)
	role: Types.AccountRole;

	@Column('text')
	@Field()
	name: string;

	@Column('text')
	@Field()
	email: string;

	@Column('text')
	password: string;

	@Column({ default: 0 })
	@Field(() => Int)
	totalBooksCheckedout: number;

	@Column('text', { default: Types.AccountStatus.NONE })
	@Field(() => Types.AccountStatus)
	status: Types.AccountStatus;

	@CreateDateColumn()
	@Field()
	dateOfMembership: Date;

	@BeforeInsert()
	genIdAndTrim() {
		this.id = uuidv4();
		this.name = this.name.trim();
	}
}
