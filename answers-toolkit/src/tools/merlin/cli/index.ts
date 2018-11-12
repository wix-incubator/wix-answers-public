#!/usr/bin/env node

// import { join } from 'path';
import { getPackagesInFolder } from '../local-deps';
import { dependencyGraph } from '../dependency-graph/index';

import * as minimist from 'minimist';

import {exec} from 'shelljs';
import { Result } from '../result/index';
import { getGitFilesChanged, maybeListToStr } from './utils';
import { printModulesList, buildChangedFiles, buildModules, init } from './commands/index';
import { createLogger, LogLevel, Logger } from './logger';
/*
merin init -n -d . -i --ignore name` --> init links and link all to each other
merlin ls -d --dir .` --> list all detected packages in repo
merin ls -v .` --> list all detectd packages, and also their dependencies
merlin ls . module-name --> list info about that package
merlin build-changed --files [file1, file2 file3]
merlin test-changed --files [file1, file2 file3]

*/

const argv = minimist(process.argv.slice(2));

export type Option = {name: string, short: string};

export type OptionValueMap = {
	ignoredModules: string[],
	cwd: string,
	filesChanged: string[],
	logLevel: string
};

export const strToLogLevel = (str: string): Result<LogLevel> => {
	const levelsMap = LogLevel as any;
	const val = levelsMap[str.toUpperCase()];
	return val ? Result.Ok(val) : Result.Err(new Error(`${str} is not a valid log level`));
};

export type CommandType = 'ls'
	| 'init' | 'build-changed' | 'test-changed' | 'help' | 'build-changed-git' | 'build-all';

export type Command = {type: CommandType, options: OptionValueMap};

const interpretArgs = (args: minimist.ParsedArgs): Result<Command> => {
	const [cmd] = args._;

	const ignoreOptRaw = args['ignored-modules'] || args.i;
	const filesChangedRaw = args['files-changed'] || args.f;
	const cwd = args.cwd || process.cwd();
	const ignore = ignoreOptRaw ? maybeListToStr(ignoreOptRaw) : [];
	const filesChanged = filesChangedRaw ? maybeListToStr(filesChangedRaw) : [];

	const rawLogLevel = args['log-level'] || 'log';

	const options: OptionValueMap = {
		cwd,
		ignoredModules: ignore,
		filesChanged,
		logLevel: rawLogLevel
	};

	switch (cmd) {
		case 'ls':
		case 'init':
		case 'build-changed':
		case 'build-changed-git':
		case 'build-all':
			return Result.Ok({type: cmd as CommandType, options});
		default:
			return Result.Err(new Error(`Invalid command: ${cmd}. Run merlin --help for help`));
	}
};

const runCommand = (cmd: Command, logger: Logger): Result<any> => {
	const cwd = cmd.options.cwd;
	const depsMap = getPackagesInFolder(cwd);
	cmd.options.ignoredModules.forEach((key) => {
		depsMap.delete(key);
	});

	return dependencyGraph(depsMap)
		.bind((graph) => {

			const baseData = {graph, map: depsMap, logger, exec};
			switch (cmd.type) {
				case 'ls': {
					return printModulesList(baseData);
				}
				case 'init': {
					return init(baseData);
				}
				case 'build-changed': {
					const changedFiles = cmd.options.filesChanged;
					return buildChangedFiles(baseData, cwd, changedFiles);
				}
				case 'build-changed-git': {
					return getGitFilesChanged().bind((files) => {
						return buildChangedFiles(baseData, cwd, files);
					});
				}
				case 'build-all': {
					const modules = Array.from(baseData.map.values());
					return buildModules(baseData, modules);
				}
				default:
					throw new Error ('running command ' + cmd.type + 'is not supported right now.');
			}
		});
	// tslint:disable-next-line:switch-default
};

const startTime = Date.now();
interpretArgs(argv)
	.bind((cmd) => {
		const consoleLog = console.log.bind(console);
		const logger = strToLogLevel(cmd.options.logLevel)
			.match({
				Ok: (l) => createLogger(consoleLog, l),
				Err: (e) => {
					return createLogger(consoleLog, LogLevel.DEBUG)
						.warn(e.toString());
				}
		});
		logger.debug('running command', cmd.type, 'with options', cmd.options);
		return runCommand(cmd, logger).map(() => {
			const delta = require('pretty-ms')(Date.now() - startTime);
			logger.log(`All done! ✨ [${delta}]`);
		});
	})
	.match({
		Ok: () => {
			// bob
		},
		Err: (e) => {
			// tslint:disable-next-line:no-console
			console.error('Error!', e.toString());
			process.exit(1);
		}
	});

// const cwd = dir || process.cwd();
// console.log(cwd);
// const depsMap = getPackagesInFolder(cwd);

// console.log('keys', depsMap.keys());

// const graphRes = dependencyGraph(depsMap);

// const linkInitTasks = initLinks(deps);
// const linkEachTasks = graphRes.bind((g) => linkAllDeps(g, deps)).withDefault([]);
