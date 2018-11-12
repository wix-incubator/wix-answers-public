import {expect} from 'chai';
import * as sinon from 'sinon';
import * as driver from './collapsible-radio.driver';
import * as jsdomGlobal from 'jsdom-global';

describe('Collapsible Radio Group', () => {
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

	it('should render correctly', () => {
		const comp = driver.createCollapsibleRadioGroupComp(defaultProps);
		const compChildren = comp.getChildrenByValue(items[0]);

		expect(comp.getSelectedValue()).to.eql(items[0]);

		const titleText = compChildren.find('.header-title').getText();
		expect(titleText).to.eql(`title is ${items[0]}`);

		const descriptionText = compChildren.find('.header-description').getText();
		expect(descriptionText).to.eql(`description - ${items[0]}`);
	});

	it('should call cb on click', () => {
		const spy = sinon.spy();
		const props = {...defaultProps , onChange: spy};
		const comp = driver.createCollapsibleRadioGroupComp(props);

		comp.selectByValue(items[1]);
		expect(spy.called).to.eql(true);
		expect(spy.lastCall.args).to.eql([items[1]]);
	});

	it('should not call cb on click if disabled', () => {
		const spy = sinon.spy();
		const props = {...defaultProps, onChange: spy, disabledValues: [items[1]]};
		const comp = driver.createCollapsibleRadioGroupComp(props);

		expect(comp.getSelectedValue()).to.eql(items[0]);
		comp.selectByValue(items[1]);
		expect(spy.called).to.eql(false);
		expect(comp.getSelectedValue()).to.eql(items[0]);
	});
});
