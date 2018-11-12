import { ModuleDef } from '../modules';
import { LocalDependenciesMap } from '../local-deps';
import { DepGraph, createGraph, addDependency, addNode } from './graph';
import { Result } from '../result/index';

export type ModuleDepGraph = DepGraph<ModuleDef>;

export const dependencyGraph = (localDeps: LocalDependenciesMap): Result<ModuleDepGraph> => {

		const entries = Array.from(localDeps.keys());

		// add nodes to graph
		const modGraph = entries.reduce<Result<ModuleDepGraph>>((graph, depKey) => {
			const mod = localDeps.get(depKey);
			return mod ? graph.bind((g) => addNode(g, depKey, mod)) : Result.Err(new Error('wat'));
		}, Result.Ok(createGraph<ModuleDef>()));
		// set deps
		const things = entries.reduce<Result<ModuleDepGraph>>((graph, depKey) => {
			const mod = localDeps.get(depKey);
			if (mod) {
				const withDep = graph.bind((g) => addNode(g, depKey, mod));
				return mod.dependencies
					.filter((dep) => localDeps.has(dep))
					.reduce((prev, curr) => {
						return prev.bind((g) => addDependency(g, depKey, curr));
					}, withDep);
			} else {
				return graph;
			}
		}, modGraph);

		return things;
	};
