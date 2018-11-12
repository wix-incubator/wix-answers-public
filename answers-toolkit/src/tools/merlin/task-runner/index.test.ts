import { createTestModule } from '../modules/index';
import { scriptTask } from '../tasks/index';

import {spy} from 'sinon';
import { runTask } from './index';
import { assert } from 'chai';
import { LogLevel, createLogger } from '../cli/logger';

describe('task runner', () => {
	const testLogger = createLogger((..._: any[]) => 42, LogLevel.ERROR);

	it('should run yarn build on build tasks', () => {
		const mod = createTestModule({
			scripts: ['build']
		});

		const task = scriptTask(mod, 'build');
		const fakeRunner = spy(() => ({code: 0}));

		assert.equal(fakeRunner.called, false);
		runTask(task, testLogger, fakeRunner);
		assert.equal(fakeRunner.called, true);
		assert.equal(fakeRunner.lastCall.args[0], 'yarn run build');
	});

	it('should prefer optimized script over normal build if available', () => {

		const mod = createTestModule({
			scripts: ['test', 'test:opt']
		});

		const task = scriptTask(mod, 'test');
		const fakeRunner = spy(() => ({code: 0}));

		assert.equal(fakeRunner.called, false);
		runTask(task, testLogger, fakeRunner);
		assert.equal(fakeRunner.called, true);
		assert.equal(fakeRunner.lastCall.args[0], 'yarn run test:opt');
	});
});
