import { UniDriver } from 'unidriver';
import { LineChartKey } from '.';

export type LineChartDriver = {
	getPlottedLineCount: () => Promise<number>;
	getXAxisLabels: () => Promise<string[]>;
	getXAxisTickLabels: () => Promise<string[]>;
	base: UniDriver
};

export const createLineChartDriver = (wrapper: UniDriver): LineChartDriver => {
	const base = wrapper.$(`.${LineChartKey}`);
	return {
		getPlottedLineCount: () => base.$$('.recharts-area-area').count(),
		getXAxisLabels: () => base.$$('.xAxis .recharts-cartesian-axis-tick-value').text(),
		getXAxisTickLabels: () => base.$$('.xAxis .recharts-cartesian-axis-tick').text(),
		base
	};
};
