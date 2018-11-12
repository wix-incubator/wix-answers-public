#!/usr/bin/env node

import { generateComponentContent } from './generators';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { lispCase } from './utils';

// tslint:disable-next-line:no-var-requires
const argv = require('minimist')(process.argv.slice(2));
// tslint:disable-next-line:no-var-requires
const mkdir = require('mkdirp');

const log = (msg: string) => {
	// tslint:disable-next-line:no-console
console.log(msg);
};

export const init = async (args: any) => {
	const compName = args.name;
	const stateful = !!args['kill-babies'];
	log('Welcome to Answers Comp Generator!');
	if (!compName) {
		log('No comp name was passed. Exiting.');
		log('Usage:');
		log('ans-comp --name=BobViewer');
		return;
	}

	if (stateful) {
		log('Killing babies 👶 👶 👶!');
	}

	const cwd = process.cwd();
	const folderName = lispCase(compName);
	const ns = cwd
		.replace(/.*answers-client\//, '')
		.replace(/\//g, '.')
		.replace('.src', '');
	// console.log(ns);

	const data = generateComponentContent(compName, ns);

	mkdir.sync(join(cwd, folderName));

	const keys = Object.keys(data) as Array<keyof (typeof data)>;

	keys.forEach((key) => {
		const {fileName, content} = data[key];
		const joinedFileName = join(cwd, folderName, fileName);
		writeFileSync(joinedFileName, content);
		log('Wrote ' +  fileName);
	});
	log(`Done! 🚀 🚀 🚀 🚀. Checkout [${folderName}'] folder!`);
};

init(argv);
