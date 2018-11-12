import { Result } from '../result/index';
import { DepGraph } from '../dependency-graph/graph';
import { ModuleDef } from '../modules/index';
import { ModuleDepGraph } from '../dependency-graph/index';
import { LocalDependenciesMap } from '../local-deps/index';

export let a: Result<DepGraph<any>>;

export type LinkTask = {
	type: 'link',
	from: ModuleDef,
	to: ModuleDef
};

export type MiscTask = {
	type: 'link-init' | 'packages-update',
	module: ModuleDef
};

export type ScriptName = 'build' | 'test';

export type ScriptTask = {
	type: 'script';
	scriptName: ScriptName,
	module: ModuleDef
};

export type Task = LinkTask | MiscTask | ScriptTask;

export const linkTask = (from: ModuleDef, to: ModuleDef): LinkTask => {
	return {
		type: 'link',
		from,
		to
	};
};

export const scriptTask = (module: ModuleDef, name: ScriptName): ScriptTask => ({
	type: 'script',
	scriptName: name,
	module
});

export const packageUpdateTask = (module: ModuleDef): MiscTask => ({
	type: 'packages-update',
	module
});

export const linkInitTask = (module: ModuleDef): MiscTask => ({
	type: 'link-init',
	module
});

export const linkAllDeps = (tree: ModuleDepGraph, map: LocalDependenciesMap): Result<LinkTask[]> => {
	return tree
		.overallOrder()
		.bind((deps) => {
			return deps
				.reverse()
				.map((depKey) => {
					const depListRes = tree.dependantsOf(depKey);
					const fromMod = map.get(depKey) as ModuleDef;
					return depListRes
						.map((depList) => {
							return depList.reduce<LinkTask[]>((tasks, curr) => {
								const toMod = map.get(curr) as ModuleDef;
								return [...tasks, linkTask(fromMod, toMod)];
							}, []);
						});
				})
				.reduce((res, currList) => {
					return currList.bind((list) => res.map((list2) => [...list, ...list2]));
				}, Result.Ok<LinkTask[], Error>([]));
		});
};

export const initLinks = (map: LocalDependenciesMap): MiscTask[] => {
	return Array.from(map.entries())
		.map(([_, mod]) => {
			return linkInitTask(mod);
		});
};

export const getUpdatedNeededTasks = (
	repoRoot: string,
	map: LocalDependenciesMap,
	changedFiles: string[]
): MiscTask[] => {

	const relevantChanges = changedFiles
		.filter((name) => name.indexOf('package.json') !== -1)
		.map((name) => `${repoRoot}/${name.replace('/package.json', '')}`);

	return Array.from(map.values())
		.filter((mod) => {
			return relevantChanges.indexOf(mod.location) !== -1;
		})
		.map((mod) => {
			return packageUpdateTask(mod);
		});
};

export const get = (map: LocalDependenciesMap): MiscTask[] => {
	return Array.from(map.entries())
		.map(([_, mod]) => {
			return linkInitTask(mod);
		});
};

export type BuildTaskData = {
	repoRoot: string,
	map: LocalDependenciesMap,
	changedFiles: string[]
};

// tslint:disable-next-line:max-line-length
export const createScriptTasksForChangedModules = (graph: ModuleDepGraph, modulesChanged: ModuleDef[], type: ScriptName): Result<ScriptTask[]> => {

	const buildOrder = graph.overallOrder();
	const dependantsOfChangedMods = Result.Seq(modulesChanged.map((mod) => {
		return graph.dependantsOf(mod.name).map((deps) => [...deps, mod.name]);
	})).map((mat) => mat.reduce((prev, curr) => [...prev, ...curr], []));

	return buildOrder.bind((modKeyList) => {
		return dependantsOfChangedMods.bind((list) => {

			const buildResults = modKeyList.filter((orderModKey) => {
				return list.indexOf(orderModKey) !== -1;
			})
			.map((modKey) => {
				return graph.getNodeData(modKey)
					.map((mod) => scriptTask(mod, type));
			});

			return Result.Seq(buildResults);
		});
	});
};
