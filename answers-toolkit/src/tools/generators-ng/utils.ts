export const lispCase = (str: string) => {
	return str.split('').reduce((acc, curr, idx) => {
		const isUpper = curr === curr.toUpperCase();
		const lowerCased = curr.toLowerCase();
		if (isUpper && idx > 0) {
			return acc + `-${lowerCased}`;
		} else {
			return acc + lowerCased;
		}
	}, '');
};

export const log = (msg: string) => {
	// tslint:disable-next-line:no-console
console.log(msg);
};

export const deserialize = (content: string[], lispCaseName: string, camelCaseName: string, translationNs?: string) => {
	const dc = content
		.join('\n')
		// tslint:disable-next-line:no-invalid-template-strings
		.split('${camelCaseName}')
		.join(camelCaseName)
		// tslint:disable-next-line:no-invalid-template-strings
		.split('${lispCaseName}')
		.join(lispCaseName);

	return translationNs ?
		dc
		.split('translationNs')
		.join(translationNs) :
		dc;
};

export const des = (content: string, lispCaseName: string, camelCaseName: string, lowerCamelCase: string, translationNs: string) => {
	return content
	.split('{{lowerCamelCase}}').join(lowerCamelCase)
	.split('{{camelCaseName}}').join(camelCaseName)
	.split('{{lispCaseName}}').join(lispCaseName)
	.split('{{translationNs}}').join(translationNs);
};
