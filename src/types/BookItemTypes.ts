import { registerEnumType } from 'type-graphql';

export enum BookFormat {
	HARDCOVER = 'HARDCOVER',
	PAPERBACK = 'PAPERBACK',
	AUDIO_BOOK = 'AUDIO_BOOK',
	EBOOK = 'EBOOK',
	NEWSPAPER = 'NEWSPAPER',
	MAGAZINE = 'MAGAZINE',
	JOURNAL = 'JOURNAL',
}

export enum BookStatus {
	AVAILABLE = 'AVAILABLE',
	RESERVED = 'RESERVED',
	LOANED = 'LOANED',
	LOST = 'LOST',
}

registerEnumType(BookFormat, { name: 'BookFormat' });
registerEnumType(BookStatus, { name: 'BookStatus' });
