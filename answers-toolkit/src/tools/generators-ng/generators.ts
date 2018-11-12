import { log, lispCase, deserialize } from './utils';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { defaultCompData } from './default-generator.json';
import chalk from 'chalk';
// tslint:disable-next-line:no-var-requires
const findRoot = require('find-root');

export type FolderNode = {
	files: FileNode[];
	name: string;
	type: 'folder';
};

export type FileNode = {
	content: string[];
	name: string;
	type: 'file';
};

export type Node = FileNode | FolderNode;

export const writeFiles = (path: string, name: string, ns?: string) => {
	try {
		const root = findRoot(process.cwd());
		const generatorData = JSON.parse(readFileSync(`${root}/generator.json`, 'utf-8'));
		writeFileFromJson(path, name, generatorData);
	} catch (e) {
		log(chalk.red('Failed parsing generator config file (generator.json)'));
		log(chalk.yellow('Generating default component 🚀 🚀'));
		writeFileFromJson(path, name, defaultCompData as Node, ns);
	}
};

const writeFileFromJson = (path: string, name: string, node: Node, ns?: string) => {
	const camelCaseName = name;
	const lispCaseName = lispCase(name);
	// tslint:disable-next-line:no-invalid-template-strings
	const filePath = `${path}/${node.name}`.replace('${lispCaseName}', lispCaseName);

	switch (node.type) {
		case 'folder':
			mkdirSync(filePath);
			log(`Wrote folder: ${filePath}`);
			node.files.forEach((f: any) => writeFileFromJson(filePath, name, f));
			break;
		case 'file':
			writeFileSync(filePath, deserialize(node.content, lispCaseName, camelCaseName, ns));
			log(`Wrote file: ${node.name}`);
			break;
		default:
	}
};
