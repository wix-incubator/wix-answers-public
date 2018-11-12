import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { PunchCard, PunchCardProps } from '.';
import { createPunchCardDriver } from './driver';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<PunchCardProps>(() => ({
	value: []
}));

const setup = (partialProps: Partial<PunchCardProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<PunchCardProps>(PunchCard, props);
	const baseDriver = reactUniDriver(elem);
	return createPunchCardDriver(baseDriver);
};

describe('PunchCard', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Renders a punch card with 2 strips with 3 bubbles of correct size diff', async () => {
		const value = [
			{id: 'strip-1', label: 'strip 1', points: [{x: 1, y: 20}, {x: 2, y: 10}, {x: 3, y: 14}]},
			{id: 'strip-2', label: 'strip 2', points: [{x: 1, y: 5}, {x: 2, y: 3}, {x: 3, y: 15}]}
		];
		const driver = setup({value});

		const firstRowScales = await driver.scaleAmountsAtIdx(0);
		const secondRowScales = await driver.scaleAmountsAtIdx(1);

		assert.equal(firstRowScales[0] > firstRowScales[1], true);
		assert.equal(firstRowScales[2] > firstRowScales[1], true);

		assert.equal(secondRowScales[0] > secondRowScales[1], true);
		assert.equal(secondRowScales[2] > secondRowScales[1], true);
	});

	it('Renders axis labels', async () => {
		const value = [
			{id: 'strip-1', label: 'strip 1', points: [{x: 1, y: 20}, {x: 2, y: 10}, {x: 3, y: 14}]},
			{id: 'strip-2', label: 'strip 2', points: [{x: 1, y: 5}, {x: 2, y: 3}, {x: 3, y: 15}]}
		];
		const xAxisTickLabel = (x: any) => `Day ${x}`;
		const driver = setup({value, xAxisTickLabel});

		const expectedLabels = ['Day 1', 'Day 2', 'Day 3'];
		assert.deepEqual(await driver.tickLabels(), expectedLabels);
	});
});
