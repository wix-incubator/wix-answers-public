// tslint:disable-next-line:no-var-requires
const qs = require('query-string');

export const parseQuery = (location: any): {[k: string]: string} => {
	return qs.parse(location);
};

export const stringifyQuery = (query: any): string => {
	return qs.stringify(query);
};
