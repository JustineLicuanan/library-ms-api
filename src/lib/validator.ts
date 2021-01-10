export const areAllArrayElementsIs = (
	arr: any[],
	validationFunc: (data: any) => boolean
) =>
	Array.isArray(arr) && !!arr.length && arr.every((el) => validationFunc(el));
