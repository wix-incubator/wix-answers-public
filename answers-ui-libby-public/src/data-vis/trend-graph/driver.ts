import { UniDriver } from 'unidriver';
import { TrendGraphKey } from '.';

export type TrendGraphDriver = {
	isVisible: () => Promise<boolean>,
	base: UniDriver
};

export const createTrendGraphDriver = (wrapper: UniDriver): TrendGraphDriver => {
	const base = wrapper.$(`.${TrendGraphKey}`);
	return {
		isVisible: () => base.$('.recharts-area-curve').exists(),
		base
	};
};
