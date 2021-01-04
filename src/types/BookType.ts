import { Document } from 'mongoose';

export interface IAuthor extends Document {
	name: string;
	description?: string;
}

export interface IBook extends Document {
	ISBN: string;
	title: string;
	subject: string;
	publisher: string;
	language: string;
	numberOfPages: number;
	authors: IAuthor[];
}
