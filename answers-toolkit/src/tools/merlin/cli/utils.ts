import {exec} from 'shelljs';
import { Result } from '../result/index';
export const getGitFilesChanged = (): Result<string[]> => {

	const params =  (process.env.GIT_PARAMS || '').split(' ');

	const ohead = params[0];
	const nhead = params[1];

	if (ohead && nhead) {
		const files = exec(`git diff-tree -r --name-only --no-commit-id ${ohead} ${nhead}`)
			.stdout.trim()
			.split('\n')
			.filter((file) => file.length);
		return Result.Ok(files);
	} else {
		return Result.Err(new Error('could not get git files'));
	}
};

export const maybeListToStr = (str: string | string[]): string[] => {
	if (typeof str === 'string') {
		return [str];
	} else {
		return str;
	}
};
