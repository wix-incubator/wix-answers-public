import { exceptionToResult, Result } from '../result';
import { readFileSync } from 'fs';
import { join } from 'path';

type RawModuleDef = {
	name: string,
	version: string,
	dependencies: {[name: string]: string},
	devDependencies: {[name: string]: string},
	peerDependencies: {[name: string]: string},
	scripts: {[name: string]: string}
};

export type ModuleDef = {
	name: string,
	dependencies: string[],
	location: string,
	scripts: string[]
};

export const createTestModule = (partial: Partial<ModuleDef>) => {
	const dMdl: ModuleDef = {
		name: 'empty',
		dependencies: [],
		location: '/dev/null',
		scripts: []
	};

	return {...dMdl, ...partial};
};

const getDeps = (mod: RawModuleDef): string[] => {
	return Object.keys({
		...mod.dependencies,
		...mod.devDependencies,
		...mod.peerDependencies
	});
};

export const getModuleDef = (path: string): Result<ModuleDef, Error> => {
	return exceptionToResult(() => {
		const rawJson = readFileSync(path, 'utf-8');
		const json: RawModuleDef = JSON.parse(rawJson);
		// tslint:disable-next-line:no-object-literal-type-assertion
		return {
			name: json.name,
			location: path.replace('/package.json', ''),
			dependencies: getDeps(json),
			scripts: Object.keys(json.scripts || {})
		};
	});
};

export const getModuleByFolder = (folder: string): Result<ModuleDef, Error> => {
	const packageJsonPath = join(folder, 'package.json');
	return getModuleDef(packageJsonPath);
};
