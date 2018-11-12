import { join } from 'path';
import { getPackagesInFolder, getModulesByFiles } from './local-deps';
import { linkAllDeps, initLinks, createScriptTasksForChangedModules } from './tasks';
import { dependencyGraph } from './dependency-graph/index';
import { runTask } from './task-runner/index';

import {exec} from 'shelljs';

const p = join('/Users/gabrielg/projects/tool-tester-repo/root');
const deps = getPackagesInFolder(p);

// deps.delete('answers-app-sandbox');

const graphRes = dependencyGraph(deps);

const linkInitTasks = initLinks(deps);
const linkEachTasks = graphRes.bind((g) => linkAllDeps(g, deps)).withDefault([]);

// tslint:disable-next-line:no-console
console.log(linkInitTasks, linkEachTasks);

const changedModules = getModulesByFiles(deps, ['somedir/p3/src/bob.ts'], p);

const tasks = graphRes.bind((g) => createScriptTasksForChangedModules(g, changedModules, 'build')).withDefault([]);

tasks.forEach((task) => {
	const result = runTask(task, console.log.bind(console), exec);
	const msg = result.match({
		Ok: () => 'Task run ok',
		Err: (err) => `Task with error ${err}`,
	});
	// tslint:disable-next-line:no-console
	console.log('-- Result:', msg);
});
