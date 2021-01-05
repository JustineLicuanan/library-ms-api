import { Response } from 'express';

export const handleBookError = (res: Response, err: any, isNew?: true) => {
	const errors: any = {};
	const errMsg = isNew ? 'book validation failed' : 'Validation failed';

	// Handle validation errors
	if (err._message === errMsg) {
		Object.keys(err.errors).forEach((errPath) => {
			errors[errPath] = err.errors[errPath].message;
		});
		res.status(400).json({ err: errors });
		return;
	}

	// Handle must-unique props errors
	if (err.code === 11000 && err.keyPattern.ISBN) {
		errors.ISBN = 'ISBN is already in the database';
		res.status(400).json({ err: errors });
		return;
	}

	// Handle other errors
	res.status(400).json({
		err: true,
		message: err.message,
	});
};
