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

export const lowerCamelCase = (str: string) => str.split('').map((c, idx) => idx ? c : c.toLowerCase()).join('');
