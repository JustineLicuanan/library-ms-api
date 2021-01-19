import { registerEnumType } from 'type-graphql';

export enum AccountStatus {
	ACTIVE = 'ACTIVE',
	CLOSED = 'CLOSED',
	CANCELED = 'CANCELED',
	BLACKLISTED = 'BLACKLISTED',
	NONE = 'NONE',
}

export enum AccountRole {
	LIBRARIAN = 'LIBRARIAN',
	MEMBER = 'MEMBER',
}

registerEnumType(AccountStatus, { name: 'AccountStatus' });
registerEnumType(AccountRole, { name: 'AccountRole' });
