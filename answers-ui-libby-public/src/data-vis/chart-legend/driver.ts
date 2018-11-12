import { UniDriver } from 'unidriver';
import { ChartLegendKey } from '.';
import { popoverDriver } from '../../drivers';
import { CheckboxGroupDriver, createCheckboxGroupDriver } from '../../composites/checkbox-group/driver';

export type ChartLegendDriver = {
	getLabelNames: () => Promise<string[]>;
	getLabelValues: () => Promise<number[]>;
	getSelectedLabels: () => Promise<string[]>;
	clickLegendLabelByIndex: (idx: number) => Promise<void>;
	isMoreLabelsVisible: () => Promise<boolean>;
	moreMenu: () => Promise<CheckboxGroupDriver>;
	base: UniDriver
};

export const createChartLegendDriver = (wrapper: UniDriver, global: UniDriver): ChartLegendDriver => {
	const base = wrapper.$(`.${ChartLegendKey}`);
	const moreFloater = popoverDriver(global);

	return {
		getLabelNames: () => base.$$('.label-name').text(),
		getLabelValues: () => base.$$('.label-value').map(async (item) => parseInt(await item.text(), 10)),
		getSelectedLabels: () => base.$$('.legend-label-view.selected .label-name').text(),
		clickLegendLabelByIndex: (idx: number) => base.$$('.legend-label-view').get(idx).click(),
		isMoreLabelsVisible: () => base.$('.more-labels').exists(),
		moreMenu: async () => {
			await base.$('.more-labels').click();
			await moreFloater.wait();
			return createCheckboxGroupDriver(moreFloater);
		},
		base
	};
};
