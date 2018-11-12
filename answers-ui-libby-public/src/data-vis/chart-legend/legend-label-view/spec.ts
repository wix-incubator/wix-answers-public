import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { LegendLabelView, LegendLabelViewProps } from '.';
import { createLegendLabelViewDriver } from './driver';
import { noop } from '../../../common';
import { spy } from 'sinon';
import { ChartLegendLabel } from '..';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<LegendLabelViewProps>(() => ({
	value: true,
	onChange: noop,
}));

const setup = (partialProps: Partial<LegendLabelViewProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<LegendLabelViewProps>(LegendLabelView, props);
	const baseDriver = reactUniDriver(elem);
	return createLegendLabelViewDriver(baseDriver);
};

const testLabel: ChartLegendLabel = {
	id: 'some-id',
	name: 'Bob',
	value: 10,
	color: '#e2e2e2'
};

describe('LegendLabelView', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Shows name and value for legend label', async () => {
		const label = testLabel;
		const driver = setup({label});

		assert.equal(await driver.getName(), label.name);
		assert.equal(await driver.getValue(), label.value);
	});

	it('Calls cb when clicking legend', async () => {
		const label = testLabel;
		const onChange = spy();
		const value = false;
		const driver = setup({label, value, onChange});

		await driver.click();
		assert.equal(onChange.called, true);
		assert.equal(onChange.lastCall.args[0], true);
	});
});
