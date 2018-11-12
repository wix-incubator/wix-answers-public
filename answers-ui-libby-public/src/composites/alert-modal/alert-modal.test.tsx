
import { assert } from 'chai';
import { AlertModalProps } from './alert-modal.comp';
import { renderAlertModalAndReturnDriver } from './alert-modal.driver';
import { testDataCreator, noop } from 'answers-toolkit';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testDataCreator<AlertModalProps>(() => ({
	isOpen: true,
	body: 'bob',
	closeText: 'Ok',
	onClose: noop,
}));

describe('Alert Modal', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should show the body text', () => {
		const props = propsCreator({});
		const driver = renderAlertModalAndReturnDriver(props);
		assert.equal(driver.getText(), 'bob');
	});

	it('should call the close cb', () => {
		const onClose = sinon.spy();
		const props = propsCreator({ onClose });
		const driver = renderAlertModalAndReturnDriver(props);
		assert.equal(onClose.called, false);
		driver.close();
		assert.equal(onClose.called, true);
	});
});
