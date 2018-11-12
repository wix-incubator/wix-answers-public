import { assert } from 'chai';
import { spy } from 'sinon';
import { deprecatedMsg } from './';

describe('Deprecated Message', () => {
	let consoleSpy: any;

	beforeEach(() => {
		consoleSpy = spy(console, 'log');
	});

	afterEach(() => {
		consoleSpy.restore();
	});

	it('should print msg when in development env', () => {
		process.env.NODE_ENV = 'development';
		const testMsg = 'Testing';

		assert.equal(consoleSpy.called, false);
		deprecatedMsg(testMsg);
		assert.equal(consoleSpy.called, true);
	});

	it('should not print msg when in production env', () => {
		process.env.NODE_ENV = 'production';

		assert.equal(consoleSpy.called, false);
		deprecatedMsg('Testing');
		assert.equal(consoleSpy.called, false);
	});
});
