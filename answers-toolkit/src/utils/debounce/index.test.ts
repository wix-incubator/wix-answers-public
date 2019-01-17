import { debounce } from '.';
import { spy } from 'sinon';
import { assert } from 'chai';
import { delay, eventually } from '../testing';
import { randomNumber } from '../testing/random';

const until = (fn: any) => eventually(() => {
	if (!fn()) {
		throw new Error('wait..');
	}
});

describe('Debounce', () => {
	// https://jira.wixpress.com/browse/WA-6809
	it.skip('calls debounced function after given delay', async () => {
		const fn = spy();
		const debouncedFn = debounce(fn, 20);

		debouncedFn();
		await delay(20);

		assert.equal(fn.called, true);
	});

	it('does not call debounced function before given delay', async () => {
		const fn = spy();
		const debouncedFn = debounce(fn, 20);

		debouncedFn();
		await delay(10);

		assert.equal(fn.called, false);
	});

	it('returns value from debounced function in promise', async () => {
		const val = Math.random();
		const fn = spy(() => val);
		const debouncedFn = debounce(fn, 20);

		const res = await debouncedFn();

		assert.equal(res, val);
	});

	it('resolves promise passed returned from debounced function', async () => {
		const val = Math.random();
		const asyncFn = spy(() => Promise.resolve(val));
		const debouncedAsyncFn = debounce(asyncFn, 20);

		const res = await debouncedAsyncFn();

		assert.equal(res, val);
	});

	it('passes debounced function parameter to promise', async () => {
		const val = Math.random();
		const asyncFn = (passedVal: number) => Promise.resolve(passedVal);
		const debouncedAsyncFn = debounce(asyncFn, 20);

		const res = await debouncedAsyncFn(val);

		assert.equal(res, val);
	});

	// https://jira.wixpress.com/browse/WA-6809
	it.skip('calls debounced function once in given delay interval', async () => {
		const fn = spy();
		const debouncedFn = debounce(fn, 20);

		debouncedFn();
		await delay(5);
		debouncedFn();
		await delay(5);
		debouncedFn();
		await delay(5);
		debouncedFn();
		await delay(20);

		assert.equal(fn.callCount, 1);
	});

	it('waits for the last active promise to resolve before triggering again', async () => {
		/*
		 this test checks that if fn returns a promise, but there is another previous
		 promise pending, it'll wait for it and only then trigger fn again.
		 this helps prevent race conditions when server requests take more than the
		 debounce amount
		*/
		const fnSpy = spy();

		const debounceDelay = 50;
		const promiseDelay = 100;
		const safetyTime = 2;

		// fn will take at leats 40 ms to complete
		const fn = async () => {
			fnSpy();
			await delay(promiseDelay);
		};

		const debouncedFn = debounce(fn, debounceDelay);
		debouncedFn();
		await delay(debounceDelay + safetyTime);
		// ~52 ms passed, out of debounce, fn triggers.
		// Promise 1 starts running, will end in ~100ms
		assert.equal(fnSpy.callCount, 1);
		debouncedFn();
		await delay(debounceDelay + safetyTime);
		// ~104 ms passed, out of debounce
		// fn should not trigger as promise A is still pending
		// and needs about ~48ms more to end
		assert.equal(fnSpy.callCount, 1);

		await delay(debounceDelay);
		// another ~50ms pass, Promise A is done, fn should be called again
		assert.equal(fnSpy.callCount, 2);
	});

	it('handles race conditions in resolved promises correctly', async () => {
		const serverCallSpy = spy();
		const callsToDo = 10;

		const serverSimulator = async (i: number) => {
			const fakeServerLag = randomNumber(10, 50);
			serverCallSpy(i);
			await delay(fakeServerLag);
			return i;
		};

		const debounceRate = 10;
		const debouncedFn = debounce(serverSimulator, debounceRate);

		const promises = [];

		for (let i = 0; i < callsToDo; i++) {
			promises.push(debouncedFn(i));
			await delay(debounceRate + 2);
		}

		// wait for all requests to end
		await until(() => serverCallSpy.callCount === callsToDo);
		const calls = serverCallSpy.getCalls();
		// make sure they were called in order, regardess of the delay
		calls.forEach((call, idx) => {
			assert.equal(call.args[0], idx);
		});

		const results = await Promise.all(promises);
		// make sure the promises resolve well
		results.forEach((res, idx) => res === idx);
	}).timeout(3000);

});
