import { getPackagesInFolder } from '../merlin/local-deps/index';

export const getChangedModules = (allModules: string[], changedFiles: string[]) => {
	return allModules.reduce<string[]>((p, moduleName) => {
		const has = changedFiles.filter((file) => file.indexOf(moduleName) === 0).length > 0;
		return has ? [...p, moduleName] : p;
	}, []);
};

export const getModulesByPath = (root: string) => {
	const stuff = getPackagesInFolder(root);
	return Array.from(stuff.values()).map((def) => def.location.replace(root + '/', ''));
};

const getChangedModuleLabelInternal = (modules: string[]): string[] => {
	if (modules.length === 0) {
		return [];
	} else if (modules.length === 1) {
		return [modules[0].split('/').join('-')];
	} else if (modules.length === 2) {
		return modules.map((mod) => mod.split('/').join('-'));
	} else {
		const parts = modules
			.map((m) => m.split('/'));
		const maxDepth = parts.reduce((p, c) => p < c.length ? c.length : p, -1);

		const nextParents = parts.map((part) => {
			return part.length === maxDepth ? part.slice(0, maxDepth - 1).join('/') : part.join('/');
		});
		const unique = nextParents.filter((item, i) => {
			return nextParents.indexOf(item) === i;
		});
		return getChangedModuleLabelInternal(unique);
	}
};

export const getChangedModuleLabel = (modules: string[], aliases: {[k: string]: string} = {}): string => {
	return getChangedModuleLabelInternal(modules)
		.map((mod) => aliases[mod] || mod)
		.join('+');
};
