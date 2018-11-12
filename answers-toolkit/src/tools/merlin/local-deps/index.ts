import { lstatSync, readdirSync } from 'fs';
import { ModuleDef } from '../modules';
import { join } from 'path';
import { setMap, mergeMap } from '../common';
import { getModuleDef } from '../modules/index';

export type LocalDependenciesMap = Map<string, ModuleDef>;

const isDirectory = (source: string) => lstatSync(source).isDirectory();

const ignoredFolders = ['node_modules', '_node_modules', 'bower_components']; // _node_modules is for testing..

export const getPackagesInFolder = (folder: string, start = new Map()): LocalDependenciesMap => {
	// const filePath = folder + '/**/*/package.json';
	const filesInFolder = readdirSync(folder);
	const isPackageFolder = filesInFolder.indexOf('package.json') !== -1;
	const folders = filesInFolder
		.map((dir) => join(folder, dir))
		.filter((dir) => isDirectory(dir))
		.filter((dir) => {
			return ignoredFolders.indexOf(dir.replace(folder, '').replace('/', '')) === -1;
		});

	const withPackage = isPackageFolder ? getModuleDef(join(folder, 'package.json'))
	.map((v) => setMap(start, v.name, v))
	.withDefault(start) : start;

	return folders
		.map((dir) => getPackagesInFolder(dir, withPackage))
		.reduce((map, curr) => mergeMap(map, curr), withPackage);
};

export const getModulesByFiles = (map: LocalDependenciesMap, files: string[], root: string): ModuleDef[] => {
	const relevantChangesFullPath = files
		.map((name) => `${root}/${name}`);

	return Array.from(map.values())
		.filter((mod) => {
			return relevantChangesFullPath.some((src) => {
				return src.indexOf(mod.location) !== -1;
			});
		});
};
