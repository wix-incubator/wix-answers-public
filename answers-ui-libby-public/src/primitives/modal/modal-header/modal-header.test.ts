import { expect } from 'chai';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';
import { createModalHeader } from './modal-header.driver';

describe('Modal Header', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should render a modal header with back button and call cb', () => {
		const spy = sinon.spy();
		const modalHeader = createModalHeader({ onBack: spy });

		expect(spy.called).to.eql(false);
		modalHeader.clickBack();
		expect(spy.called).to.eql(true);
	});
});
