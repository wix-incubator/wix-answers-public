import { delay, noop, eventually } from '../..';
import { Poller, SmartPoller } from './index';
import { assert } from 'chai';
import { spy } from 'sinon';

describe('Poller', () => {

	it('should call polling function at start and given interval', async () => {
		const callsSpy = spy();
		const fakeApiCall = async () => {
				await delay(1);
				return Promise.resolve({});
		};

		const interval = 70;
		const endPolling = Poller(fakeApiCall, callsSpy, {interval});
		assert.equal(callsSpy.callCount, 0);
		await delay(5);
		assert.equal(callsSpy.callCount, 1);
		await delay(interval + 10);
		assert.equal(callsSpy.callCount, 2);
		await delay(interval + 10);
		assert.equal(callsSpy.callCount, 3);
		await delay(interval / 2);
		assert.equal(callsSpy.callCount, 3);

		endPolling();
	});

	it('should provide new values to listeners after polling', async () => {
		let counter = 1;
		const value = 'Bob';
		const fakeApiCall = async () => {
				return Promise.resolve(value + counter++);
		};

		const interval = 50;
		const listener = spy();
		const startTime = Date.now();
		const endPolling = Poller(fakeApiCall, listener, {interval});
		await eventually(() => {
			assert.equal(listener.lastCall.args[0], 'Bob1');
		}, interval + 10, 10);

		await eventually(() => {
			assert.equal(listener.lastCall.args[0], 'Bob2');
		}, interval + 10, 10);

		await eventually(() => {
			assert.equal(listener.lastCall.args[0], 'Bob3');
		}, interval + 10, 10);

		await eventually(() => {
			assert.equal(listener.lastCall.args[0], 'Bob4');
		}, interval + 10, 10);

		const timePassed = Date.now() - startTime;
		assert.approximately(timePassed, interval * 3, interval / 2);
		endPolling();
	});

	it('calls error handler on errors and triples interval for next retry', async () => {
		const fakeApiCall = async () => {
			return Promise.reject(new Error('bah error'));
		};

		const interval = 50;
		const errorListener = spy();
		Poller(fakeApiCall, noop, {interval, errorCb: errorListener});
		await delay(5);
		assert.equal(errorListener.callCount, 1);
		assert.include(errorListener.lastCall.args[0].toString(), 'bah error');
		await delay(interval * 3 + 5);
		assert.equal(errorListener.callCount, 2);
	});

	it('increases the interval exponentially after each errors, and stops after 4', async () => {
		const fakeApiCall = async () => {
			await delay(1);
			return Promise.reject(new Error('bah error'));
		};

		const interval = 12;
		const errorListener = spy();
		Poller(fakeApiCall, noop, {interval, errorCb: errorListener});
		await delay(2);
		assert.equal(errorListener.callCount, 1);
		assert.include(errorListener.lastCall.args[0].toString(), 'bah error');
		await delay(interval * 3 + 7);
		assert.equal(errorListener.callCount, 2);

		await delay(interval * 3);
		assert.equal(errorListener.callCount, 2); // coz it grows exp, this should not have been called yet
		await delay(interval * 3 * 2 + 10); // (3 * 3 * interval - last check)
		assert.equal(errorListener.callCount, 3);
		await delay(interval * 3 * 3 * 3); // (3 * 3 * interval - last check)
		assert.equal(errorListener.callCount, 4);
		await delay(interval * 3 * 3 * 3 * 3 + 5); // (3 * 3 * interval - last check)

		// now it should stop!
		assert.equal(errorListener.callCount, 4);
	});

	it('resumes polling as normal if retry succesful', async () => {
		let error = false;
		const fakeApiCall = async () => {
				return error ? Promise.reject(new Error('bah error')) : Promise.resolve('bob');
		};

		const interval = 20;
		const successListener = spy();
		const errorListener = spy();
		const endPolling = Poller(fakeApiCall, successListener, {interval, errorCb: errorListener});
		await delay(2);
		assert.equal(successListener.callCount, 1);
		await delay(interval);
		assert.equal(errorListener.callCount, 0);
		assert.equal(successListener.callCount, 2);
		error = true;
		await delay(interval + 5);
		assert.equal(successListener.callCount, 2);
		assert.equal(errorListener.callCount, 1);
		await delay(interval);
		assert.equal(errorListener.callCount, 1);
		await delay(interval * 2);
		assert.equal(errorListener.callCount, 2);
		error = false;
		await delay(interval * 3 * 3);
		assert.equal(successListener.callCount, 3);
		assert.equal(errorListener.callCount, 2);
		await delay(interval);
		assert.equal(successListener.callCount, 4);
		endPolling();
	});

	it('should stop polling when end polling called', async () => {
		const callsSpy = spy();
		const fakeApiCall = async () => {
				await delay(1);
				return Promise.resolve({});
		};

		const interval = 20;
		const endPolling = Poller(fakeApiCall, callsSpy, {interval});
		assert.equal(callsSpy.callCount, 0);
		await delay(5);
		assert.equal(callsSpy.callCount, 1);
		await delay(interval + 3);
		assert.equal(callsSpy.callCount, 2);
		endPolling();
		assert.equal(callsSpy.callCount, 2);
		await delay(interval * 5);
		assert.equal(callsSpy.callCount, 2);
	});

	it('should pause polling when isPaused returns true and resume when isPaused return false', async () => {
		let paused = false;
		const callsSpy = spy();
		const fakeApiCall = async () => {
				await delay(1);
				return Promise.resolve({});
		};
		const isPaused = () => paused;

		const interval = 50;
		const endPolling = Poller(fakeApiCall, callsSpy, {interval, isPaused});
		assert.equal(callsSpy.callCount, 0);
		await delay(5);
		assert.equal(callsSpy.callCount, 1);
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 2);
		paused = true;
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 2);
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 2);
		paused = false;
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 3);
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 4);
		endPolling();
	});

});

describe('Smart Poller', () => {
	it('should stop polling when tab is hidden', async () => {
		const callsSpy = spy();
		const fakeApiCall = async () => {
				return Promise.resolve('bob');
		};
		const fakeDocument = {
			visibilityState: 'visible'
		} as any;

		const interval = 50;
		SmartPoller(fakeApiCall, callsSpy, {interval, document: fakeDocument});
		await delay(5);
		assert.equal(callsSpy.callCount, 1);
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 2);
		fakeDocument.visibilityState = 'hidden';
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 2);
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 2);
		fakeDocument.visibilityState = 'visible';
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 3);
		await delay(interval + 5);
		assert.equal(callsSpy.callCount, 4);
	});
});
