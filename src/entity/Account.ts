import { Field } from 'type-graphql';
import { BaseEntity, BeforeInsert, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { hash as bcryptHash } from 'bcryptjs';

import * as Types from '../types/AccountTypes';

export abstract class Account extends BaseEntity {
	@PrimaryColumn('uuid')
	@Field()
	id: string;

	@Column('text')
	@Field()
	email: string;

	@Column('text')
	password: string;

	@Column('text', { default: Types.AccountStatus.NONE })
	@Field(() => Types.AccountStatus)
	status: Types.AccountStatus;

	@Column('simple-json')
	@Field(() => Types.Person)
	person: Types.Person;

	@BeforeInsert()
	async genIdHashAndTrim() {
		this.id = uuidv4();
		this.password = await bcryptHash(this.password, 10);
		this.person.name = this.person.name.trim();
		this.person.address.streetAddress = this.person.address.streetAddress.trim();
		this.person.address.city = this.person.address.city.trim();
		this.person.address.state = this.person.address.state.trim();
		this.person.address.zipCode = this.person.address.zipCode.trim();
		this.person.address.country = this.person.address.country.trim();
	}
}
