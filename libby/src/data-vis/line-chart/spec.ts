import { ChartLine } from '../domain';
import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-lib';
import { reactUniDriver } from 'unidriver';
import { LineChart, LineChartProps } from '.';
import { createLineChartDriver } from './driver';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<LineChartProps>(() => ({
	lines: []
}));

const setup = (partialProps: Partial<LineChartProps>) => {
	const props = propsCreator({width: 200, height: 200, ...partialProps});
	const elem = renderAndMountComp<LineChartProps>(LineChart, props);
	const baseDriver = reactUniDriver(elem);
	return createLineChartDriver(baseDriver);
};

describe('LineChart', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Renders a line chart with 2 lines and expected numerical labels', async () => {
		const line1: ChartLine = {id: 'line1', name: 'line1', values: [{x: 1, y: 1}, {x: 2, y: 2}], color: 'red'};
		const line2: ChartLine = {id: 'line2', name: 'line2', values: [{x: 1, y: 6}, {x: 2, y: 7}], color: 'blue'};
		const lines: ChartLine[] = [line1, line2];
		const driver = await setup({lines});

		assert.deepEqual(await driver.getPlottedLineCount(), 2);
		assert.deepEqual(await driver.getXAxisLabels(), ['1', '2']);
	});

	it('Renders an x axis with a custom tick label', async () => {
		const line: ChartLine = {id: 'line1', name: 'line1', values: [{x: 10, y: 1}, {x: 20, y: 2}], color: 'red'};
		const lines: ChartLine[] = [line];
		const xAxisTickLabel = (x: number) => `Day ${x}`;
		const driver = await setup({lines, xAxisTickLabel});

		const expectedLabels = line.values.map((l) => `Day ${l.x}`);

		assert.deepEqual(await driver.getXAxisTickLabels(), expectedLabels);
	});
});
