import { Result, exceptionToResult } from '../result/index';
// tslint:disable-next-line:no-var-requires
const DepGraphInternal = require('dependency-graph').DepGraph;

export const addDependency = <T>(g: DepGraph<T>, from: string, to: string) => {
	return g.addDependency(from, to);
};

export const addNode = <T>(g: DepGraph<T>, name: string, data: T) => {
	return g.addNode(name, data);
};

export type DepGraph<T> = {
	addNode: (name: string, data: T) => Result<DepGraph<T>>,
	addDependency: (from: string, to: string) => Result<DepGraph<T>>,
	dependantsOf: (name: string) => Result<string[]>,
	dependenciesOf: (name: string) => Result<string[]>,
	overallOrder: () => Result<string[]>,
	getNodeData: (name: string) => Result<T>
};

const wrap = <T>(graph: any): DepGraph<T> => {
	return {
		addNode: (n, d) => {
			return exceptionToResult(() => {
				graph.addNode(n, d);
				return wrap(graph);
			});
		},
		addDependency: (f, t) => {
			return exceptionToResult(() => {
				graph.addDependency(f, t);
				return wrap(graph);
			});
		},
		dependantsOf: (n: string) => {
			return exceptionToResult(() => {
				return graph.dependantsOf(n);
			});
		},
		dependenciesOf: (n: string) => {
			return exceptionToResult(() => {
				return graph.dependenciesOf(n);
			});
		},
		overallOrder: () => {
			return exceptionToResult(() => {
				return graph.overallOrder();
			});
		},
		getNodeData: (n: string) => {
			return exceptionToResult(() => {
				return graph.getNodeData(n);
			});
		}
	};
};

export const createGraph = <T>(): DepGraph<T> => {
	return wrap<T>(new DepGraphInternal());
};
