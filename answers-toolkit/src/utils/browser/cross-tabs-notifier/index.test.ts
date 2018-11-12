import { createCrossTabNotifier } from './index';
import { assert } from 'chai';
import { spy } from 'sinon';

const TestEmitter = (() => {
	let handlers: any[] = [];

	return {
		addListener: (cb: any) => {
			handlers.push(cb);

			return () => {
				handlers = handlers.filter((h) => cb !== h);
			};
		},
		publish: (value: any) => {
			handlers.forEach((handler) => handler(value));
		}
	};
})();

const fakeWindow = {
	addEventListener: (_: string, cb: any) => {
		return TestEmitter.addListener(cb);
	}
};

const triggerStorageEvent = (key: string, newValue: any) => {
	TestEmitter.publish({key, newValue});
};

describe('Cross Tabs Notifier', () => {
	it('should call event listeners when a local storage key is set with the right name', () => {
		const listener1 = spy();
		const listener2 = spy();
		const notifier = createCrossTabNotifier(fakeWindow as any);
		notifier.listen('bob', listener1);
		notifier.listen('shmuel', listener2);

		assert.equal(listener1.called, false);
		assert.equal(listener2.called, false);

		triggerStorageEvent('ans-cross-tab-beacon', '{"key": "bob", "msg": "dave"}');
		assert.equal(listener1.called, true);
		assert.equal(listener2.called, false);

		triggerStorageEvent('ans-cross-tab-beacon', '{"key": "shmuel", "msg": "shmuval"}');
		assert.equal(listener2.called, true);
	});
});
