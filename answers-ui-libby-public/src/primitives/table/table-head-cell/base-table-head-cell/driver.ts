import { UniDriver } from 'unidriver';

export type BaseTableHeadCellDriver = {
	click: () => Promise<void>;
	hasClass: (name: string) => Promise<boolean>;
};

export const createBaseTableHeadCellDriver = (wrapper: UniDriver): BaseTableHeadCellDriver => {
	const base = wrapper.hasClass('table-head-cell')
		.then((val) => val ? wrapper : wrapper.$('.table-head-cell'));

	return {
		click: async () => (await base).click(),
		hasClass: async (name: string) => (await base).hasClass(name)
	};
};
