#!/usr/bin/env node

import { getModulesByPath, getChangedModules, getChangedModuleLabel } from './index';

import * as minimist from 'minimist';
import { readFileSync, appendFileSync } from 'fs';
import { join } from 'path';

const argv = minimist(process.argv.slice(2));
const verboseMode = argv.verbose || argv.v;

const logFilePath = join(__dirname, '../../cml.log');

const log = (s: any) => {
	if (verboseMode) {
		appendFileSync(logFilePath, s + '\n\n\n');
	}
};

if (!argv.root || !argv._.length) {
	// tslint:disable-next-line:no-console
	throw new Error('Usage: calc-module-label --root root file1 file2 .. file-n');

}

const parseAliases = (file: string) => {
	const raw = readFileSync(join(process.cwd(), file), 'utf-8');
	return JSON.parse(raw);
};

const filterRoot = (file: string) => {
	const rootWithSlash = root + '/';
	return file.indexOf(rootWithSlash) === 0 ? file.replace(rootWithSlash, '') : file;
};

const root = argv.root;
const rootName = argv.rootName || root;

const files = argv._.map(filterRoot);
const aliases = argv.aliases ? parseAliases(argv.aliases) : {};

log(`Files: ${files}`);

// tslint:disable-next-line:no-console
const modules = getModulesByPath(root).filter((mod) => root !== mod);
log(`Found modules: ${modules}`);

const changed = getChangedModules(modules, files);
log(`Changed modules: ${modules}`);
const label = getChangedModuleLabel(changed, aliases) || rootName;

log(`Calc label: ${label}`);

process.stdout.write(label + '\n');
