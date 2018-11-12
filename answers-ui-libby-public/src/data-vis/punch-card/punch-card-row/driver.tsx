import { UniDriver } from 'unidriver';
import { punchCardRowKey } from '.';

export type PunchCardRowDriver = {
	label: () => Promise<string>,
	scaleAmounts: () => Promise<number[]>,
	base: UniDriver
};

export const createPunchCardRowDriver = (wrapper: UniDriver, idx: number = 0): PunchCardRowDriver => {
	const base = wrapper.$$(`.${punchCardRowKey}`).get(idx);

	return {
		label: () => base.$('.row-label').text(),
		scaleAmounts: () => {
			return base.$$('.value-bubble').map(async (b) => {
				return parseFloat(await b.attr('data-scale'));
			});
		},
		base
	};
};
