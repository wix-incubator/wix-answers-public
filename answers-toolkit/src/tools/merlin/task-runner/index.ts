
import { Result } from '../result/index';
import { Task } from '../tasks/index';
import { Logger } from '../cli/logger';

const execCommand = (cmd: string, cwd: string, logger: Logger, exec: any): Result<string> => {
	const ret = exec(cmd, {cwd, silent: true}) as any;
	logger.debug('going to run command', cmd, 'on dir', cwd);
	if (ret.code === 0) {
		logger.debug('finished running command successfully', cmd, 'on dir', cwd);
		return Result.Ok(ret.stdout);
	} else {
		logger.debug('finished running command with error', cmd, 'on dir', cwd);
		return Result.Err(new Error(ret.stderr));
	}
};

export const runTask = (task: Task, logger: Logger, execFun: any): Result<string> => {

	// tslint:disable-next-line:switch-default
	switch (task.type) {
		case 'link-init': {
			const mod = task.module;
			logger.info('linking', mod.name);
			const cwd = mod.location;
			logger.debug(`running yarn link on [${cwd}]`);
			return execCommand('yarn link', cwd, logger, execFun);
		}
		case 'link': {
			const {to, from} = task;
			logger.info(`linking ${to.name} to ${from.name}`);
			logger.debug(`will run 'yarn link ${from.name}' on [${to.location}]`);
			return execCommand(`yarn link ${from.name}`, to.location, logger, execFun);
		}
		case 'script': {
			const mod = task.module;
			const script = task.scriptName;
			const optScript = `${script}:opt`;
			logger.info('running script', mod.name, task.scriptName);
			const cwd = mod.location;
			const cmd = mod.scripts.indexOf(optScript) !== -1 ? optScript : script;
			return execCommand(`yarn run ${cmd}`, cwd, logger, execFun);
		}
		case 'packages-update': {
			const mod = task.module;
			logger.info('going to update', mod.name);
			const cwd = mod.location;
			return execCommand(`yarn`, cwd, logger, execFun);
		}
	}
};
