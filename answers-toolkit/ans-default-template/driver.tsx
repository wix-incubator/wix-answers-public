import { UniDriver } from 'unidriver';
import { {{lowerCamelCase}}Key } from './';

export type {{camelCaseName}}Driver = {
	text: () => Promise<string>,
	base: UniDriver
};

export const create{{camelCaseName}}Driver = (wrapper: UniDriver): {{camelCaseName}}Driver => {
	const base = wrapper.$(`.${{{lowerCamelCase}}Key}`);
	return {
		text: () => base.$('.title').text(),
		base
	};
};
