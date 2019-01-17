#!/usr/bin/env node

import { readFileSync } from 'fs';
import * as ts from 'typescript';

//tslint:disable

export function traverseFile (sourceFile: ts.SourceFile, onFind: (json: string) => void) {
	traverseNode(sourceFile);

	function traverseNode (node: ts.Node) {
		if (node.kind === ts.SyntaxKind.CallExpression) {
			const n = node as ts.CallExpression;
			if (n.getText().includes('devTranslations')) {
				const args = n.arguments;
				if (args.length === 1) {
					onFind(args[0].getFullText());
				} else {
					console.warn('Weird! found a call to dev translation on ', sourceFile.getSourceFile().getText(), 'with more than 1 argument. Ignoring it.. please check it yourself');
				}
			}
		}
		ts.forEachChild(node, traverseNode);
	}
}

const fileNames = process.argv.slice(2);

let resultJson = {};
fileNames.forEach(fileName => {
	// Parse a file
	let sourceFile = ts.createSourceFile(
		fileName,
		readFileSync(fileName).toString(),
		ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
	);

	// delint it
	traverseFile(sourceFile, (rawJson) => {
		console.log('Found devTranslations usage in', fileName);
		try {
			const json = eval(`(${rawJson})`);
			resultJson = {...resultJson, ...json};
			console.log('Successfully parsed it\'s argument\n');
		} catch (e) {
			throw new Error(`Error parsing devTranslation argument on ${fileName} - ${e.toString()}`);
		}
	});
});

console.log('Here is a nice JSON for you to copy!')
console.log(JSON.stringify(resultJson, null, 4));