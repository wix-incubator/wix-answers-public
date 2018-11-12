import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { TrendGraph, TrendGraphProps } from '.';
import { createTrendGraphDriver } from './driver';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<TrendGraphProps>(() => ({
	value: [{x: 1, y: 20}, {x: 3, y: 3}, {x: 6, y: 10}],
	color: '#e2e2e2',
	width: 100,
	height: 50
}));

const setup = (partialProps: Partial<TrendGraphProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<TrendGraphProps>(TrendGraph, props);
	const baseDriver = reactUniDriver(elem);
	return createTrendGraphDriver(baseDriver);
};

describe('TrendGraph', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Renders a trend graph', async () => {
		const driver = setup({});

		assert.equal(await driver.isVisible(), true);
	});
});
