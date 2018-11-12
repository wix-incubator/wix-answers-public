import { assert } from 'chai';
import { createGraph, addNode } from './graph';

describe('dep graph', () => {
	const graph = createGraph()
	.addNode('two', 2)
	.bind((g) => addNode(g, 'three', 3))
	.bind((g) => addNode(g, 'four', 4))
	.withDefault(createGraph());

	it('show work', () => {
		const data = graph.getNodeData('two').withDefault(0);
		assert.equal(data, 2);
	});

	it('show work', () => {
		const withDeps = graph
			.addDependency('one', 'two')
			.withDefault(graph)
			.addDependency('two', 'three')
			.withDefault(graph)
			.addDependency('two', 'four')
			.withDefault(graph);

		const depsOfTwo = withDeps.dependenciesOf('two').withDefault([]);
		assert.deepEqual(depsOfTwo, ['three', 'four']);
	});
});
