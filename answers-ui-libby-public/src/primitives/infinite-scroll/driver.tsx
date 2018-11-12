import { UniDriver } from 'unidriver';
import { infiniteScrollKey } from './';
import { Simulate } from 'react-dom/test-utils';

export type InfiniteScrollDriver = {
	itemsCount: () => Promise<number>;
	scroll: (scrollTop: number) => Promise<void>;
	wait: (timeout?: number) => Promise<void>;
	base: UniDriver;
};

export const createInfiniteScrollDriver = (wrapper: UniDriver): InfiniteScrollDriver => {
	const base = wrapper.$(`.${infiniteScrollKey}`);
	return {
		itemsCount: () => base.$$('.item').count(),
		scroll: async (scrollTop: number) => Simulate.scroll(await base.getNative(), { target: { scrollTop } as any }),
		wait: (timeout?: number) => base.wait(timeout),
		base,
	};
};
