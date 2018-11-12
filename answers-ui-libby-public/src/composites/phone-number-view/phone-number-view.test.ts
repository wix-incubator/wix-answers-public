import * as jsdomGlobal from 'jsdom-global';
import * as driver from './phone-number-view.driver';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { PhoneNumberViewProps, CallData } from './phone-number-view';
import { PhoneLineBuilder } from '../../common';

describe('Phone Number View', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const t = () => 'bob';

	const defaultProps: PhoneNumberViewProps = {
		lines: [],
		phoneNumber: {
			countryCode: '972',
			number: '5324343'
		},
		t,
		onCall: sinon.spy()
	};

	const defaultResult: CallData = {
		phoneNumber: defaultProps.phoneNumber,
		lineId: ''
	};

	const line1 = new PhoneLineBuilder().withName('TEST1').withId('1').build();
	const line2 = new PhoneLineBuilder().withName('TEST2').withId('2').build();
	const lines = [line1, line2];

	const defaultPropsWithLines: PhoneNumberViewProps = { ...defaultProps, lines };

	it('Renders the component with the correct phone number', () => {
		const comp = driver.createPhoneNumberView(defaultProps);
		const expectedNumber = `+${defaultProps.phoneNumber.countryCode}-${
			defaultProps.phoneNumber.number
			}`;

		expect(comp.getPhoneNumber()).to.eql(expectedNumber);
	});

	it('Doesnt Call when no lines available', () => {
		const onCall = sinon.spy();
		const comp = driver.createPhoneNumberView({ ...defaultProps, onCall });

		expect(onCall.called).to.eql(false);
		comp.clickPhoneNumber();
		comp.clickCallButton();
		expect(onCall.called).to.eql(false);
	});

	it('Calls cb when clicking the Call button with one line', () => {
		const onCall = sinon.spy();
		const comp = driver.createPhoneNumberView({ ...defaultProps, lines: [line1], onCall });

		expect(onCall.called).to.eql(false);
		comp.clickPhoneNumber();
		comp.clickCallButton();
		expect(onCall.called).to.eql(true);
		expect(onCall.lastCall.args).to.eql([{...defaultResult, lineId: '1'}]);
	});

	it('Calls cb when clicking the Call button', () => {
		const onCall = sinon.spy();
		const comp = driver.createPhoneNumberView({ ...defaultPropsWithLines, onCall });

		expect(onCall.called).to.eql(false);
		comp.clickPhoneNumber();
		comp.clickCallButton();
		expect(onCall.called).to.eql(true);
		expect(onCall.lastCall.args).to.eql([{...defaultResult, lineId: '1'}]);
	});

	it('Does not show line selector if there is one line', () => {
		const onCall = sinon.spy();
		const comp = driver.createPhoneNumberView({ ...defaultPropsWithLines, onCall });
		comp.clickPhoneNumber();
		comp.getLinesList();
		expect(onCall.called).to.eql(false);
		expect(comp.getLinesList()).lengthOf(2);
		expect(comp.getLinesList().join()).includes(line1.name).includes(line2.name);
	});

	it('Calls cb with selected line id when calling after choosing line', () => {
		const onCall = sinon.spy();
		const comp = driver.createPhoneNumberView({ ...defaultPropsWithLines, onCall });
		comp.clickPhoneNumber();
		expect(onCall.called).to.eql(false);
		comp.selectLine(1);
		comp.clickCallButton();
		expect(onCall.called).to.eql(true);
		expect(onCall.lastCall.args).to.eql([{ ...defaultResult, lineId: '2' }]);
	});
});
