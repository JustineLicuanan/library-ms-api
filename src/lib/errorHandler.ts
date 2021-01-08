import { validate } from 'class-validator';

export const handleClassValidatorError = async (instance: any) => {
	const errors = await validate(instance);

	if (errors.length) {
		const err: any = {};
		errors.forEach(({ property, constraints }) => {
			err[property] = constraints;
		});

		return err;
	}

	return null;
};
