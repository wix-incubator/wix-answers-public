import { UniDriver } from 'unidriver';
import { floaterMenuKey } from './floater-menu';

export type FloaterMenuDriver = {
	getItemsCount: () => Promise<number>;
	selectByValue: (val: string) => Promise<void>;
	select: (idx: number) => Promise<void>;
};

export const createFloaterMenuDriver = (wrapper: UniDriver): FloaterMenuDriver => {
	const base = wrapper.$(`.${floaterMenuKey}`);

	const select = (idx: number) => base.$$('.menu-item').get(idx).click();
	return {
		getItemsCount: () => base.$$('.menu-item').count(),
		select,
		selectByValue: async (val: string) => {
			const baseDrivers = await base.$$('.menu-item');
			await baseDrivers.filter(async (d) => {
				const value = await d.attr('data-value');
				return value === val;
			})
			.get(0)
			.click();
		}
	};
};
