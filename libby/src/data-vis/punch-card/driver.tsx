import { UniDriver } from 'unidriver';
import { punchCardKey } from '.';
import { createPunchCardRowDriver } from './punch-card-row/driver';

export type PunchCardDriver = {
	scaleAmountsAtIdx: (idx: number) => Promise<number[]>,
	rowLabels: () => Promise<string[]>,
	tickLabels: () => Promise<string[]>,
	base: UniDriver
};

export const createPunchCardDriver = (wrapper: UniDriver): PunchCardDriver => {
	const base = wrapper.$(`.${punchCardKey}`);

	return {
		scaleAmountsAtIdx: (idx: number) => createPunchCardRowDriver(base, idx).scaleAmounts(),
		rowLabels: () => base.$$('.punch-card-row .row-label').text(),
		tickLabels: () => base.$$('.axis-label').text(),
		base
	};
};
