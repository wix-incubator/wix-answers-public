import {expect} from 'chai';
import * as sinon from 'sinon';
import * as driver from './collapsible-toggle.driver';
import * as jsdomGlobal from 'jsdom-global';

const children = 'this is bob`s children';
const defaultValue = {toggled: true, expanded: false};
const defaultProps = {title: 'test title', value: defaultValue, onChange: sinon.spy(), children};

describe('Collapsible with Toggle', () => {
	let cleanup: any;
	const title = 'test title';

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should render correctly', () => {
		const comp = driver.createCollapsbileToggle(defaultProps);

		expect(comp.getTitleText()).to.eql(title);
		expect(comp.isExpanded()).to.eql(false);
		expect(comp.isOn()).to.eql(true);
	});

	it('should call cb when toggled', () => {
		const spy = sinon.spy();
		const expected = {toggled: false, expanded: false};
		const props = {...defaultProps, onChange: spy};
		const comp = driver.createCollapsbileToggle(props);

		expect(spy.called).to.eql(false);
		comp.toggle();
		expect(spy.called).to.eql(true);
		expect(spy.lastCall.args).to.eql([expected]);
	});

	it('Should call cb when expanded', () => {
		const spy = sinon.spy();
		const expected = {toggled: true, expanded: true};
		const props = {...defaultProps, onChange: spy};
		const comp = driver.createCollapsbileToggle(props);

		expect(spy.called).to.eql(false);
		comp.toggleCollapsible();
		expect(spy.called).to.eql(true);
		expect(spy.lastCall.args).to.eql([expected]);
	});

	it('should not call cb when toggled if disabled', () => {
		const spy = sinon.spy();
		const props = {...defaultProps, onChange: spy, disabled: true};
		const comp = driver.createCollapsbileToggle(props);

		expect(spy.called).to.eql(false);
		expect(comp.isOn()).to.eql(true);
		comp.toggle();
		expect(spy.called).to.eql(false);
		expect(comp.isOn()).to.eql(true);
	});
});
