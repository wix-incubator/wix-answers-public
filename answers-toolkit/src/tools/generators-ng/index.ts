#!/usr/bin/env node

import { writeFiles } from './ans-generator';
import { log } from './utils';
import chalk from 'chalk';

// tslint:disable-next-line:no-var-requires
const argv = require('minimist')(process.argv.slice(2));
// tslint:disable-next-line:no-var-requires

export const init = async (args: any) => {
	const compName = args.name;
	log(chalk.cyan('Welcome to Answers Comp Generator!'));

	if (!compName) {
		log(chalk.red('No comp name was passed. Exiting.'));
		log('Usage:');
		log('ans-comp --name=BobViewer');
		return;
	}

	const cwd = process.cwd();

	const ns = cwd
		.replace(/.*answers-client\//, '')
		.replace(/\//g, '.')
		.replace('.src', '');

	writeFiles(cwd, compName, ns);
	log(`Done! 🚀 🚀 🚀 🚀`);
};

init(argv);
