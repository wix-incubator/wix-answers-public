
import { assert } from 'chai';
import { ConfirmModalProps } from './confirm-modal.comp';
import { renderConfirmModalAndReturnDriver } from './confirm-modal.driver';
import { testDataCreator, noop } from 'answers-lib';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testDataCreator<ConfirmModalProps>(() => ({
	isOpen: true,
	title: 'title',
	body: 'bob',
	confirmText: 'confirm',
	cancelText: 'cancel',
	level: 'alert',
	onConfirm: noop,
	onCancel: noop,
}));

describe('Confirm Modal', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should show the title', () => {
		const props = propsCreator({});
		const driver = renderConfirmModalAndReturnDriver(props);
		assert.equal(driver.getText(), 'title');
	});

	it('should call the confirm cb', () => {
		const onConfirm = sinon.spy();
		const props = propsCreator({ onConfirm });
		const driver = renderConfirmModalAndReturnDriver(props);
		assert.equal(onConfirm.called, false);
		driver.confirm();
		assert.equal(onConfirm.called, true);
	});

	it('should call the cancel cb', () => {
		const onCancel = sinon.spy();
		const props = propsCreator({ onCancel });
		const driver = renderConfirmModalAndReturnDriver(props);
		assert.equal(onCancel.called, false);
		driver.cancel();
		assert.equal(onCancel.called, true);
	});
});
