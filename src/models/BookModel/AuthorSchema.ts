import mongoose from 'mongoose';

// Inits
const Schema = mongoose.Schema;

// Create author schema
const AuthorSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Author name field is required'],
		},
		description: {
			type: String,
			trim: true,
			required: [true, 'Author description field is required'],
		},
	},
	{ timestamps: true }
);

export default AuthorSchema;
