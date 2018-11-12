import * as jsdomGlobal from 'jsdom-global';
import * as sinon from 'sinon';
import * as driver from './time-input.driver';
import { expect } from 'chai';
import { TimeInputValue } from './time-input';
import { eventually } from 'answers-lib';

describe('Time Input', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should render the component with the correct time and period', () => {
		const value: TimeInputValue = {
			hours: 13,
			minutes: 0
		};

		const onChange = sinon.spy();

		const comp = driver.createTimeInput({ value, onChange });

		expect(comp.getTime()).to.eql('01:00');
		expect(comp.getPeriod()).to.eql('pm');
	});

	it('calls proper cb when an option is selected', async () => {
		const value: TimeInputValue = {
			hours: 13,
			minutes: 0
		};

		const onChange = sinon.spy();

		const comp = driver.createTimeInput({ value, onChange });

		comp.selectOption(0);

		// expect(comp.()).to.eql('01:00');
		await eventually(() => {
			expect(onChange.called).to.eql(true);
			expect(onChange.lastCall.args[0].hours).to.eql(13);
			expect(onChange.lastCall.args[0].minutes).to.eql(0);
		});
	});

	it('Should render the component with the correct time for 12pm', () => {
		const value: TimeInputValue = {
			hours: 12,
			minutes: 0
		};

		const onChange = sinon.spy();

		const comp = driver.createTimeInput({ value, onChange });

		expect(comp.getTime()).to.eql('12:00');
		expect(comp.getPeriod()).to.eql('pm');
	});

	it('Should call cb on blur with the correct time and period when value is entered manually', () => {
		const onChange = sinon.spy();

		const value = {
			hours: 1,
			minutes: 49
		};

		const comp = driver.createTimeInput({ value, onChange });

		expect(onChange.called).to.eql(false);
		expect(comp.getTime()).to.eql('01:49');
		expect(comp.getPeriod()).to.eql('am');
		comp.enterTime('13:00');
		expect(comp.getTime()).to.eql('01:00');
		expect(onChange.called).to.eql(true);
		const expectedArgs = {
			hours: 13,
			minutes: 0
		};

		expect(onChange.lastCall.args[0]).to.eql(expectedArgs);
	});

	it('Should revert to the last known valid time on blur, if invalid time is provided', () => {
		const onChange = sinon.spy();
		const value = {
			hours: 1,
			minutes: 0
		};

		const comp = driver.createTimeInput({ value, onChange });

		expect(onChange.called).to.eql(false);
		comp.enterTime('ewfewfe');
		expect(onChange.called).to.eql(true);
		expect(comp.getTime()).to.eql('01:00');
		expect(onChange.lastCall.args[0]).to.eql(value);
	});
});
