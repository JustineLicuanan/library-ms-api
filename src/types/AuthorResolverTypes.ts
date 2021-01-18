import { Field, InputType, ObjectType } from 'type-graphql';
import { IsUUID } from 'class-validator';

import { IsNotBlank } from '../lib/IsNotBlank';

@InputType()
export class AddAuthorInput {
	@Field()
	@IsNotBlank()
	name: string;

	@Field()
	@IsNotBlank()
	description: string;
}

@ObjectType()
export class AddAuthorObject {
	@Field()
	id: string;

	@Field()
	name: string;

	@Field()
	description: string;
}

@InputType()
export class UpdateAuthorInput {
	@Field()
	@IsUUID(4)
	id: string;

	@Field({ nullable: true })
	@IsNotBlank()
	name?: string;

	@Field({ nullable: true })
	@IsNotBlank()
	description?: string;
}

@InputType()
export class DeleteAuthorInput {
	@Field()
	@IsUUID(4)
	id: string;
}
