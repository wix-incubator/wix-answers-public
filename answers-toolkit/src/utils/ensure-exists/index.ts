export const ensureExists = <T>(item: T | null | undefined, msg?: string): T => {
	if (typeof item === 'undefined' || item === null) {
		throw (msg || 'Variable is null or undefined');
	}
	return item;
};
