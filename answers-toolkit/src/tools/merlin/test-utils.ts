import { LocalDependenciesMap } from './local-deps/index';
import { ModuleDef } from './modules/index';
import { setMap } from './common';

export const modulesToMap = (mods: ModuleDef[]): LocalDependenciesMap => {
	return mods.reduce((m, c) => {
		return setMap(m, c.name, c);
	}, new Map());
};
