import { createRadioGroupComp } from './radio-group.legacy-driver';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

import { reactUniDriver } from 'unidriver';
import { createRadioGroupDriver } from './driver';

describe('radio group', () => {
	const items = ['Hi', 'Hello', 'BOB'];
	const disabledValues: string[] = [];
	const defaultProps = {onChange: sinon.spy(), items, disabledValues};
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should render default value correctly', () => {
		const comp = createRadioGroupComp(defaultProps);
		expect(comp.getSelectedValue()).to.eql(items[0]);
		expect(comp.getChildrenByValue(items[0]).getText()).to.eql(items[0]);
	});

	it('Should call cb when clicking the radio button', () => {
		const onChange = sinon.spy();
		const comp = createRadioGroupComp({...defaultProps, onChange});

		expect(onChange.called).to.eql(false);
		comp.selectByValue(items[1]);
		expect(onChange.called).to.eql(true);
		expect(onChange.lastCall.args[0]).to.eql(items[1]);
	});

	it('Should not call cb when clicking on a disabled radio button', () => {
		const onChange = sinon.spy();
		const props = {...defaultProps, onChange, disabledValues: [items[1]]};
		const comp = createRadioGroupComp(props);

		expect(onChange.called).to.eql(false);
		comp.selectByValue(items[1]);
		expect(onChange.called).to.eql(false);
	});

	describe('new driver', () => {

		it('should render default value correctly', async  () => {
			const elem = createRadioGroupComp(defaultProps).wrapper;
			const driver = createRadioGroupDriver(reactUniDriver(elem));

			expect(await driver.getSelectedValue()).to.eql(items[0]);
		});

		it('Should call cb when clicking the radio button', async () => {
			const onChange = sinon.spy();
			const comp = createRadioGroupComp({...defaultProps, onChange});
			const driver = createRadioGroupDriver(reactUniDriver(comp.wrapper));

			expect(onChange.called).to.eql(false);
			await driver.selectByValue(items[1]);
			expect(onChange.called).to.eql(true);
			expect(onChange.lastCall.args[0]).to.eql(items[1]);
	});

		it('Should not call cb when clicking on a disabled radio button', () => {
			const onChange = sinon.spy();
			const comp = createRadioGroupComp({...defaultProps, onChange});
			const driver = createRadioGroupDriver(reactUniDriver(comp.wrapper));

			expect(onChange.called).to.eql(false);
			driver.selectByValue(items[1]);
			expect(onChange.called).to.eql(false);
		});
	});
});
