import { assert } from 'chai';
import { getModuleByFolder, getPackagesInFolder } from './index';
import { join } from 'path';
// import * as glob from 'glob';
import { createTestModule } from './modules/index';
import { dependencyGraph } from './dependency-graph/index';

const fixturePath = join(__dirname, '../../../fixture');
const pkgPath = (name: string) => join(fixturePath, name);

const getMdl = (name: string) => {
	return getModuleByFolder(pkgPath(name))
		.withDefault(createTestModule({}));
};

describe('', () => {
	it('should get module based on folder', () => {
		const mdl = getMdl('p1');
		assert.equal(mdl.name, 'p1');
	});

	it('should calculate dep graph given module', () => {
		const deps = getPackagesInFolder(fixturePath);
		const tree = dependencyGraph(deps);

		const depsOfP1 = tree
			.map((t) => t.dependenciesOf('p1').withDefault([]))
			.withDefault([]);

		assert.include(depsOfP1, 'p2');
	});

	it('should calculate dep graph given module and be recursive', () => {
		const deps = getPackagesInFolder(fixturePath);
		const tree = dependencyGraph(deps);

		const depsOfP2 = tree
		.map((t) => t.dependenciesOf('p2').withDefault([]))
		.withDefault([]);

		assert.include(depsOfP2, 'p2-1');
	});

	it('should not include exteral dependencies', () => {
		const deps = getPackagesInFolder(fixturePath);
		const tree = dependencyGraph(deps);
		const depsOfP2 = tree
		.map((t) => t.dependenciesOf('p2').withDefault([]))
		.withDefault([]);
		assert.notInclude(depsOfP2, 'e1');
	});
});

describe('shomsdfo', () => {

	it('dffg', () => {
		// const p = join('/Users/gabrielg/projects/answers-client');
		// const deps = getPackagesInFolder(p);

		// deps.delete('answers-app-sandbox');
		// // const dArr = Array.from(deps.keys());
		// console.log(dArr);
		// // const graph = dependencyGraph(deps).bind((g) => g.overallOrder());
		// const graph2 = dependencyGraph(deps).bind((g) => g.dependantsOf('answers-app-settings'));
		// // assert.equal(graph.match({Ok: debugToStr, Err: debugToStr}), 2);
		// assert.equal(graph2.match({Ok: debugToStr, Err: debugToStr}), 2);
	});
});
