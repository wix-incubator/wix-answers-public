import { UniDriver } from 'unidriver';
import { roundNotificationKey } from '.';

export type RoundNotificationDriver = {
	count: () => Promise<number>,
	hasIcon: () => Promise<boolean>,
	base: UniDriver
};

export const createRoundNotificationDriver = (wrapper: UniDriver): RoundNotificationDriver => {
	const base = wrapper.$(`.${roundNotificationKey}`);
	return {
		count: async () => {
			const count = await base.$('.count').text();
			return parseInt(count, 10);
		},
		hasIcon: () => base.$('.icon').exists(),
		base
	};
};
