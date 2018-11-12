import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { ChartLegend, ChartLegendProps } from '.';
import { createChartLegendDriver } from './driver';
import { noop } from '../../common';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<ChartLegendProps>(() => ({
	labels: [],
	value: {},
	maxVisibleLabels: 8,
	onChange: noop,
}));

const setup = (partialProps: Partial<ChartLegendProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<ChartLegendProps>(ChartLegend, props);
	const baseDriver = reactUniDriver(elem);
	const global = reactUniDriver(document.body);
	return createChartLegendDriver(baseDriver, global);
};

const testLegendLabels = [
	{id: 'item1', color: 'red', name: 'English', value: 13412},
	{id: 'item2', color: 'green', name: 'Russian', value: 323},
	{id: 'item3', color: 'blue', name: 'German', value: 2},
	{id: 'item4', color: 'yellow', name: 'Swiss', value: 2},
	{id: 'item5', color: 'pink', name: 'Greek', value: 2},
	{id: 'item6', color: 'purple', name: 'Mandarin', value: 2},
	{id: 'item7', color: 'brown', name: 'Spanish', value: 2},
	{id: 'item8', color: 'black', name: 'Polish', value: 2},
	{id: 'item9', color: 'magenta', name: 'Hebrew', value: 2}
];

describe('ChartLegend', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Shows legend labels with values', async () => {
		const labels = testLegendLabels.slice(0, 5);

		const driver = await setup({labels});

		const expectedNames = labels.map((l) => l.name);
		const expectedValues = labels.map((l) => l.value);

		assert.deepEqual(await driver.getLabelNames(), expectedNames);
		assert.deepEqual(await driver.getLabelValues(), expectedValues);
	});

	it('Calls cb when a legend label is clicked', async () => {
		const labels = testLegendLabels;
		const onChange = spy();
		const value = labels.reduce((res, curr) => ({...res, [curr.id]: true}), {});
		const expectedValue = {...value, [labels[2].id]: false};
		const driver = setup({labels, value, onChange});

		await driver.clickLegendLabelByIndex(2);
		assert.equal(onChange.called, true);
		assert.deepEqual(onChange.lastCall.args[0], expectedValue);
	});

	it('Does not call cb when trying to uncheck last selected legend label', async () => {
		const labels = testLegendLabels;
		const onChange = spy();
		const value = labels.reduce((res, curr, i) => ({...res, [curr.id]: i === 0}), {});
		const driver = setup({labels, value, onChange});

		await driver.clickLegendLabelByIndex(0);
		assert.equal(onChange.called, false);
	});

	it('Shows more labels in dropdown with the current visible ones checked', async () => {
		const labels = testLegendLabels;
		const value = labels.reduce((res, curr, i) => ({...res, [curr.id]: i < 7}), {});
		const driver = setup({labels, value});

		const expectedVisible = labels.slice(0, 8).map((l) => l.name);

		assert.deepEqual(await driver.getLabelNames(), expectedVisible);
		const moreMenu = await driver.moreMenu();
		assert.deepEqual(await moreMenu.selectedLabels(), expectedVisible);
	});

	it('Forces last visible unchecked item to be checked, if it becomes the only visible one', async () => {
		const labels = testLegendLabels;
		const value = labels.reduce((res, curr, i) => ({...res, [curr.id]: i > 0 && i < 7}), {});

		const onChange = spy();
		const driver = setup({labels, value, onChange});

		const moreMenu = await driver.moreMenu();
		for (let i = 2; i <= 7; i++) {
			await moreMenu.toggle(i);
		}

		assert.deepEqual(onChange.lastCall.args[0].item1, false);

		assert.deepEqual(await moreMenu.selectedLabels(), ['English', 'Russian']);
		assert.deepEqual(await driver.getSelectedLabels(), ['Russian']);

		await moreMenu.toggle(1);
		assert.equal((await driver.getLabelNames()).length, 1);
		assert.deepEqual(onChange.lastCall.args[0].item1, true);
	});

	it('Removes a visible label via the dropdown and calls cb', async () => {
		const labels = testLegendLabels;
		const value = labels.reduce((res, curr, i) => ({...res, [curr.id]: i < 7}), {});
		const expectedValue = {...value, [labels[0].id]: false};
		const onChange = spy();
		const driver = setup({labels, value, onChange});

		const moreMenu = await driver.moreMenu();
		await moreMenu.toggle(0);
		assert.equal(onChange.called, true);
		assert.deepEqual(onChange.lastCall.args[0], expectedValue);
	});
});
