import { UniDriver } from 'unidriver';
import { paginationKey } from '.';

export type PaginationDriver = {
	getVisiblePages: () => Promise<string[]>,
	getSelected: () => Promise<string>,
	selectedPage: (page: number) => Promise<void>,
	base: UniDriver
};

export const createPaginationDriver = (wrapper: UniDriver): PaginationDriver => {
	const base = wrapper.$(`.${paginationKey}`);
	return {
		getVisiblePages: async () => base.$$('.page').text(),
		getSelected: async () => base.$('.page.current').text(),
		selectedPage: async (page: number) => {
			return base.$(`.page.page-${page}`).click();
		},
		base
	};
};
