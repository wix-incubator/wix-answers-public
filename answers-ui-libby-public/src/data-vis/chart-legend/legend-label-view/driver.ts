import { UniDriver } from 'unidriver';
import { LegendLabelViewKey } from '.';

export type LegendLabelViewDriver = {
	getName: () => Promise<string>;
	getValue: () => Promise<number>;
	click: () => Promise<void>;
	selected: () => Promise<boolean>;
	base: UniDriver;
};

export const createLegendLabelViewDriver = (wrapper: UniDriver): LegendLabelViewDriver => {
	const base = wrapper.$(`.${LegendLabelViewKey}`);
	return {
		getName: () => base.$('.label-name').text(),
		getValue: () => base.$('.label-value').text().then((t) => parseInt(t, 10)),
		click: () => base.click(),
		selected: () => base.hasClass('selected'),
		base
	};
};
