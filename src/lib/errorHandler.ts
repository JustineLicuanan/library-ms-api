import { validate } from 'class-validator';

export const handleClassValidatorError = async (instance: any, skip?: true) => {
	const errors = !skip
		? await validate(instance)
		: await validate(instance, { skipMissingProperties: true });

	if (errors.length) {
		const err: any = {};
		errors.forEach(({ property, constraints }) => {
			err[property] = constraints;
		});

		return err;
	}

	return null;
};
