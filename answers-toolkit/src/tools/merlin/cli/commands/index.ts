import { ModuleDepGraph } from '../../dependency-graph/index';
import { LocalDependenciesMap, getModulesByFiles } from '../../local-deps/index';
import { DepGraph } from '../../dependency-graph/graph';
import { Result } from '../../result/index';
import { createScriptTasksForChangedModules, linkAllDeps, initLinks } from '../../tasks/index';
import { runTask } from '../../task-runner/index';
import { Logger } from '../logger';
import { ModuleDef } from '../../modules/index';

// tslint:disable-next-line:no-var-requires
const chalk = require('chalk');

export let dummy1: DepGraph<Result<any>>; // https://github.com/Microsoft/TypeScript/issues/9944

export type BaseData = {
	map: LocalDependenciesMap,
	graph: ModuleDepGraph,
	logger: Logger,
	exec: any
};

export const init = ({graph, map, logger, exec}: BaseData) => {
	return linkAllDeps(graph, map)
	.bind((linkTasks) => {
		const initLinkTasks = initLinks(map);
		logger.log(`Setting up links of  ${initLinkTasks.length} dependencies`);
		return Result.Seq(initLinkTasks.map((task) => runTask(task, logger, exec)))
			.bind(() => {
				logger.log('All links are setup!');
				logger.log(`Linking ${linkTasks.length} dependecies to each other ${linkTasks.length}`);
				return Result.Seq(linkTasks.map((task) => runTask(task, logger, exec)))
					.map((res) => {
						logger.log('All links set!');
						return res;
					});
			});
	});
};

export const printModulesList = ({graph, map, logger}: BaseData) => {
	logger.log(chalk.bold(`Found ${map.size} local dependencies:`));
	return graph
		.overallOrder()
			.bind((order) => {
				return Result.Seq(order.map((key) => {
					const dependenciesRes = graph.dependenciesOf(key);
					const dependatsRes = graph.dependantsOf(key);
					return dependenciesRes.bind((dp) => {
						return dependatsRes.map((dt) => {
							const dpStr = `Dependencies: ${dp.join(', ')} `;
							const dtStr = `Dependants: ${dt.join(', ')}`;
							logger.log(`-${key} ${chalk.dim(`${dp.length} dependencies, ${dt.length} dependants`)}`);
							logger.info(`${dp.length ? dpStr : ''}${dt.length ? dtStr : ''}`);
							return '';
						});
					});
				}));
			});
};

export const buildModules = ({logger, graph, exec}: BaseData, modules: ModuleDef[]) => {
	const buildTasks = createScriptTasksForChangedModules(graph, modules, 'build');
	return buildTasks.bind((tasks) => {
		const names = tasks.map((t) => t.module.name).join(', ');
		logger.log(`Will build ${tasks.length} modules: ${names}`);
		const results = tasks
			.map((task) => runTask(task, logger, exec));
		return Result.Seq(results);
	});
};

export const buildChangedFiles = (bd: BaseData, cwd: string, changedFiles: string[]) => {
	const {logger, map} = bd;
	logger.debug('Changed files', changedFiles);
	const changedModules = getModulesByFiles(map, changedFiles, cwd);
	logger.info(`Found ${changedModules.length} changed modules. Creating build tasks`);
	return buildModules(bd, changedModules);
};
