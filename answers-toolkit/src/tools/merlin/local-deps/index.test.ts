import { getPackagesInFolder, getModulesByFiles } from './index';
import { join } from 'path';
import { assert } from 'chai';
import { createTestModule } from '../modules/index';
import { modulesToMap } from '../test-utils';

const fixturePath = join(__dirname, '../../../../fixture');

describe('local deps', () => {
	it('should get deps in folder', () => {
		const deps = getPackagesInFolder(fixturePath);
		assert.equal(deps.size , 5);
		(assert as any).hasAllKeys(deps, ['p1', 'p2', 'p2-1', 'p3', 'pn1']);
	});

	it('should not external modules (in node modules)', () => {
		const deps = getPackagesInFolder(fixturePath);
		assert.notInclude(Array.from(deps.keys()), 'bob');
	});

	it('should get modules modules changd based on files', () => {
		const repoRoot = '/some/dir';
		const p1 = createTestModule({name: 'p1', location: `${repoRoot}/p1`});
		const p2 = createTestModule({name: 'p2', location: `${repoRoot}/p2`});

		const map = modulesToMap([p1, p2]);
		const changedFiles = ['p1/package.json', 'p2/david.ts', 'external/package.json'];
		assert.deepEqual(getModulesByFiles(map, changedFiles, repoRoot), [p1, p2]);
	});

});
