import { Field, ObjectType, registerEnumType } from 'type-graphql';

export enum AccountStatus {
	ACTIVE = 'ACTIVE',
	CLOSED = 'CLOSED',
	CANCELED = 'CANCELED',
	BLACKLISTED = 'BLACKLISTED',
	NONE = 'NONE',
}
registerEnumType(AccountStatus, { name: 'AccountStatus' });

@ObjectType()
export class Address {
	@Field()
	streetAddress: string;

	@Field()
	city: string;

	@Field()
	state: string;

	@Field()
	zipCode: string;

	@Field()
	country: string;
}

@ObjectType()
export class Person {
	@Field()
	name: string;

	@Field()
	address: Address;

	@Field()
	phone: string;
}
