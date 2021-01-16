import { Field, InputType } from 'type-graphql';
import { IsUUID } from 'class-validator';

import { IsNotBlank } from '../lib/IsNotBlank';

@InputType()
export class CreateAuthorInput {
	@Field()
	@IsNotBlank()
	name: string;

	@Field()
	@IsNotBlank()
	description: string;
}

@InputType()
export class UpdateAuthorInput {
	@Field()
	@IsUUID()
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
	@IsUUID()
	id: string;
}
