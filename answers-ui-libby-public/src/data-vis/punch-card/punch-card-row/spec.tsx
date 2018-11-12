import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { PunchCardRow, PunchCardRowProps } from '.';
import { createPunchCardRowDriver } from './driver';
import * as jsdomGlobal from 'jsdom-global';

const defaultValue = {id: 'id-1', label: 'bob', points: [{x: 1, y: 1}, {x: 2, y: 2}]};

const propsCreator = testViewCompPropsCreator<PunchCardRowProps>(() => ({
	value: defaultValue,
}));

const setup = (partialProps: Partial<PunchCardRowProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<PunchCardRowProps>(PunchCardRow, props);
	const baseDriver = reactUniDriver(elem);
	return createPunchCardRowDriver(baseDriver);
};

describe('PunchCardRow', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Shows the row label', async () => {
		const value = {...defaultValue, label: 'eize yofi'};
		const driver = setup({value});

		assert.equal(await driver.label(), 'eize yofi');
	});

	it('Renders a row with expected size differences of bubble sizes', async () => {
		const points = [{x: 1, y: 10}, {x: 2, y: 2}, {x: 3, y: 60}];
		const value = {...defaultValue, points};
		const driver = setup({value});

		const bubbleScale = await driver.scaleAmounts();
		assert.equal(bubbleScale[2] > bubbleScale[0], true);
		assert.equal(bubbleScale[2] > bubbleScale[1], true);
		assert.equal(bubbleScale[0] > bubbleScale[1], true);
	});
});
