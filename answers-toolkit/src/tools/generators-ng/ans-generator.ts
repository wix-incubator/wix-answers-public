import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { lispCase, log, des } from './utils';
import chalk from 'chalk';
// tslint:disable-next-line:no-var-requires
const findRoot = require('find-root');

export type FolderNode = {
	files: FileNode[];
	name: string;
	type: 'folder';
};

export type FileNode = {
	content: string;
	name: string;
	type: 'file';
};

export type Node = FileNode | FolderNode;

export const readTemplateFiles = (templatePath: string, folderName: string, onFileContent: (filename: string, content: string) => FileNode) => {
	const filenames = readdirSync(templatePath);

	const folder: FolderNode = {
		type: 'folder',
		name: folderName,
		files: [],
	};

	return filenames.reduce((prev: FolderNode, curr: string) => {
		const content = readFileSync(`${templatePath}${curr}`, 'utf-8');
		const file = onFileContent(curr, content);
		return { ...prev, files: prev.files.concat([file]) };
		}, folder);
};

export const populateFilesData = (path: string, folderName: string) => {
	return readTemplateFiles(path, folderName, (filename: string, content: string) => {

		const file: FileNode = {
			type: 'file',
			name: filename,
			content,
		};

		return file;
	});
};

const writeNode = (path: string, name: string, node: Node, translationNs: string) => {
	const lispCaseName = lispCase(name);
	const camelCaseName = name;
	const lowerCamelCase = camelCaseName.charAt(0).toLowerCase() + camelCaseName.slice(1);
	// tslint:disable-next-line:no-invalid-template-strings
	const filePath = `${path}/${node.name}`.replace('${lispCaseName}', lispCaseName);

	switch (node.type) {
		case 'folder':
			mkdirSync(filePath);
			log(`Wrote folder: ${filePath}`);
			node.files.forEach((f: any) => writeNode(filePath, name, f, translationNs));
			break;
		case 'file':
			writeFileSync(filePath, des(node.content, lispCaseName, camelCaseName, lowerCamelCase, translationNs));
			log(`Wrote file: ${node.name}`);
			break;
		default:
	}
};

export const writeFiles = (path: string, name: string, translationNs: string) => {
	const root = findRoot(process.cwd());
	try {
		const templateDirname = 'ans-template';
		const data = populateFilesData(`${root}/${templateDirname}/`, lispCase(name));
		writeNode(path, name, data, translationNs);
	} catch (e) {
		log(chalk.red('Failed parsing template files (ans-template dir)'));
		log(chalk.yellow('Generating default component 🚀 🚀'));
		const templateDirname = 'ans-default-template';
		const data = populateFilesData(`${root}/node_modules/@wix/answers-lib/${templateDirname}/`, lispCase(name));
		writeNode(path, name, data, translationNs);
	}
};
