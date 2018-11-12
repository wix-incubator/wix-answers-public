import { createTestModule } from '../modules/index';
import { assert } from 'chai';
import { dependencyGraph } from '../dependency-graph/index';
import {
		linkAllDeps,
		initLinks,
		getUpdatedNeededTasks,
		createScriptTasksForChangedModules
} from './index';
import { modulesToMap } from '../test-utils';

describe('tasks', () => {
	it('should create tasks link all local dependencies to themselves', () => {

		const p3 = createTestModule({name: 'p3'});
		const p2 = createTestModule({name: 'p2', dependencies: ['p3']});
		const p1 = createTestModule({name: 'p1', dependencies: ['p2']});

		const map = modulesToMap([p1, p2, p3]);

		const depTreeRes = dependencyGraph(map);
		const linkRes = depTreeRes.bind((tree) => linkAllDeps(tree, map));
		const links = linkRes.withDefault([]);

		assert.equal(links.length, 3);
		assert.equal(links[0].from.name, 'p3');
		assert.equal(links[0].to.name, 'p1');
		assert.equal(links[1].from.name, 'p3');
		assert.equal(links[1].to.name, 'p2');
		assert.equal(links[2].from.name, 'p2');
		assert.equal(links[2].to.name, 'p1');
	});

	it('should create setup link tasks', () => {
		const p2 = createTestModule({name: 'p2', dependencies: ['p3']});
		const p1 = createTestModule({name: 'p1', dependencies: ['p2']});

		const map = modulesToMap([p1, p2]);

		const tasks = initLinks(map);

		assert.equal(tasks.length, 2);
		assert.equal(tasks[0].module.name, 'p1');
		assert.equal(tasks[1].module.name, 'p2');
	});

	it('should create update tasks based on files changed and their modules', () => {
		const repoRoot = '/some/dir';
		const p1 = createTestModule({name: 'p1', location: `${repoRoot}/p1`});
		const p2 = createTestModule({name: 'p2', location: `${repoRoot}/p2`});

		const map = modulesToMap([p1, p2]);
		const changedFiles = ['p1/package.json', 'p2/david.ts', 'external/package.json'];
		const tasks = getUpdatedNeededTasks(repoRoot, map, changedFiles);

		assert.equal(tasks.length, 1);
		assert.equal(tasks[0].module.name, 'p1');
	});

	describe('script tasks', () => {
		const repoRoot = '/some/dir';
		const p1 = createTestModule({name: 'p1', location: `${repoRoot}/p1`, dependencies: ['p2', 'p3']});
		const p2 = createTestModule({name: 'p2', location: `${repoRoot}/p2`, dependencies: ['p3']});
		const p3 = createTestModule({name: 'p3', location: `${repoRoot}/other/p3`});
		const p4 = createTestModule({name: 'p4', location: `${repoRoot}/other/p4`});
		const p5 = createTestModule({name: 'p5', location: `${repoRoot}/other/p5`, dependencies: ['p4']});
		const map = modulesToMap([p1, p2, p3, p4, p5]);
		const graph = dependencyGraph(map).withDefault(null as any);

		it('should create script tasks based on files changed and their modules', () => {
			const changedMods = [p1];
			const tasks = createScriptTasksForChangedModules(graph, changedMods, 'build')
				.withDefault([]);

			assert.equal(tasks.length, 1);
			assert.equal(tasks[0].scriptName, 'build');
			assert.equal(tasks[0].module.name, 'p1');
		});

		it('should trigger builds on order of dependencies', () => {
			const changedMods = [p3];
			const tasks = createScriptTasksForChangedModules(graph, changedMods, 'test')
			.withDefault([]);

			assert.equal(tasks.length, 3);
			assert.equal(tasks[0].scriptName, 'test');
			assert.deepEqual(tasks.map((t) => t.module.name), ['p3', 'p2', 'p1']);
		});
	});

});
