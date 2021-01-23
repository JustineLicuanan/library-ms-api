import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { IsEmailNotExist } from '../lib/IsEmailNotExist';
import { IsNotBlank } from '../lib/IsNotBlank';

@InputType()
export class RegisterInput_Address {
	@Field()
	@IsNotBlank()
	streetAddress: string;

	@Field()
	@IsNotBlank()
	city: string;

	@Field()
	@IsNotBlank()
	state: string;

	@Field()
	@IsNotBlank()
	zipCode: string;

	@Field()
	@IsNotBlank()
	country: string;
}

@InputType()
export class RegisterInput_Person {
	@Field()
	@IsNotBlank()
	name: string;

	@Field()
	address: RegisterInput_Address;

	@Field()
	@IsNotBlank()
	phone: string;
}

@InputType()
export class RegisterInput {
	@Field({ nullable: true })
	isLibrarian?: true;

	@Field()
	@IsEmail()
	@IsEmailNotExist()
	email: string;

	@Field()
	@IsNotBlank()
	@MinLength(8)
	password: string;

	@Field()
	person: RegisterInput_Person;
}

@InputType()
export class LoginInput {
	@Field({ nullable: true })
	isLibrarian?: true;

	@Field()
	email: string;

	@Field()
	password: string;
}
