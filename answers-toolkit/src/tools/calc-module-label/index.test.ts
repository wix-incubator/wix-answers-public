import { assert } from 'chai';

import {getModulesByPath, getChangedModules, getChangedModuleLabel} from './';

describe('something', () => {

	it('should get the list of modules by root path', () => {
		const root = 'fixture';
		const expected = ['nested/pn1', 'p1', 'p1/p2', 'p2-1', 'p3'];

		assert.sameMembers(getModulesByPath(root), expected);
	});

	it('should get the name of modules based on files to be commited', () => {
		const allModules = ['app/callcenter', 'public', 'app/main', 'app/helpdesk/common'];
		const filesChanged = [
			'app/main/src/bob.ts',
			'public/src/bob2.ts',
			'public/src/bob3.ts',
			'app/helpdesk/common/main.ts',
		];

		assert.sameMembers(getChangedModules(allModules, filesChanged), ['app/main', 'public', 'app/helpdesk/common']);
	});

	it('works also when a name of a module is inside the name of file', () => {
		const allModules = ['app', 'public'];
		const filesChanged = [
			'app/public/file.ts'
		];

		assert.sameMembers(getChangedModules(allModules, filesChanged), ['app']);
	});

	describe('should get the name of modules based on files to be commited', () => {
		it('should return single module in case only 1 module was changed', () => {
			const modulesChanged = ['app'];
			assert.equal(getChangedModuleLabel(modulesChanged), 'app');
		});

		it('should return 2 module in case only 2 bob', () => {
			const modulesChanged = ['app', 'public'];
			assert.equal(getChangedModuleLabel(modulesChanged), 'app+public');
		});

		it('should return 2 module in case only 2 bob', () => {
			const modulesChanged = ['app', 'public', 'help'];
			assert.equal(getChangedModuleLabel(modulesChanged), '');
		});

		it('should return last part of module in case of nesting', () => {
			const modulesChanged = ['app/main'];
			assert.equal(getChangedModuleLabel(modulesChanged), 'app-main');
		});

		it('should return last part of module in case of nesting', () => {
			const modulesChanged = ['app/main', 'app/helpdesk'];
			assert.equal(getChangedModuleLabel(modulesChanged), 'app-main+app-helpdesk');
		});

		it('should return last part of module in case of nesting', () => {
			const modulesChanged = ['app/main', 'app/helpdesk', 'app/callcenter'];
			assert.equal(getChangedModuleLabel(modulesChanged), 'app');

			const modulesChanged2 = ['public/main', 'public/helpdesk', 'public/callcenter'];
			assert.equal(getChangedModuleLabel(modulesChanged2), 'public');
		});

		it('should return last part of module in case of nesting', () => {
			const modulesChanged = ['app/main', 'app/helpdesk', 'public/something'];
			assert.equal(getChangedModuleLabel(modulesChanged), 'app+public');
		});

		it('should return last part of module in case of nesting', () => {
			const modulesChanged = ['app/main/bob1', 'app/main/bob2', 'app/main/bob3', 'public'];
			assert.equal(getChangedModuleLabel(modulesChanged), 'app-main+public');
		});

		it('should return last part of module in case of nesting', () => {
			const modulesChanged = ['app/common',
			'common/libby'];
			assert.equal(getChangedModuleLabel(modulesChanged), 'app-common+common-libby');
		});

		describe('aliases', () => {
			it('considers aliases', () => {
				const modulesChanged = ['app/helpdesk/ticket-page'];
				const aliases = {'app-helpdesk-ticket-page': 'app-hd-ticket-page'};
				assert.equal(getChangedModuleLabel(modulesChanged, aliases), 'app-hd-ticket-page');
			});

			it('considers aliases', () => {
				const modulesChanged = ['app/common',
				'common/libby'];
				const aliases = {'common-libby': 'libby'};
				assert.equal(getChangedModuleLabel(modulesChanged, aliases), 'app-common+libby');
			});
		});

	});
});
