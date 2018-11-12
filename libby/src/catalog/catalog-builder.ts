import { readdirSync, writeFileSync, lstatSync, existsSync } from 'fs';
import { join } from 'path';
import { lispCase } from 'answers-lib/dist/tools/generators/utils';

export interface WrittenFile {
	compName: string;
	dirName: string;
}

export const catalogItemTemplate = (compName: string) => {
	const compNameCaps = compName[0].toUpperCase() + compName.slice(1);
	return `import * as React from 'react';
import { CatalogGroup } from '..';
import { ${compNameCaps}, ${compNameCaps}Props } from '../..';

export const ${compName}CatalogData: CatalogGroup<${compNameCaps}Props> = {
	render: (p) => <${compNameCaps} {...p}/>,
	items: [
		{
			label: 'Normal',
			props: {
				value: 'Set the component value here!'
			}
		}
	]
};
`;
};

export const indexFileTemplate = (files: WrittenFile[], pathPrefix: string) => `
import { CatalogGroup } from '../';
${files.map((item) => `import { ${item.compName}CatalogData } from './${item.dirName}';`).join('\n')}

export const ${pathPrefix}Cat: Array<CatalogGroup<any>> = [
	${files.map((item) => `${item.compName}CatalogData,`).join('\n\t')}
];
`;

const cwd = process.cwd();

const log = (msg: string) => {
	// tslint:disable-next-line:no-console
	console.log(`[Libby Catalog Builder] ${msg}`);
};

const toCamelCase = (text: string) => text.replace(/(\-[a-z])/g, (match) => match.toUpperCase().replace('-', ''));

// Input paths
const primitivesPath = join(cwd, 'src/primitives');
const compositesPath = join(cwd, 'src/composites');
const iconsPath = join(cwd, 'src/icons');

// Output paths
const catalogPrimitivesPath = join(cwd, 'src/catalog/primitives');
const catalogCompositesPath = join(cwd, 'src/catalog/composites');
const catalogIconsPath = join(cwd, 'src/catalog/icons');

const createCatalogFile = (compName: string, path: string) => {
	const fileToWrite = lispCase(compName) + '.tsx';
	const filePath = join(path, fileToWrite);

	const fileAlreadyExists = existsSync(filePath);

	if (!fileAlreadyExists) {
		const template = catalogItemTemplate(compName);
		writeFileSync(filePath, template);
		log('Wrote file: ' + fileToWrite);
	} else {
		log(`File ${fileToWrite} already exists in catalog directory. Skipping ..`);
	}
};

const createIndexFile = (files: WrittenFile[], path: string) => {
	const fileToWrite = 'index.ts';
	const filePath = join(path, fileToWrite);

	const fileAlreadyExists = existsSync(filePath);

	if (!fileAlreadyExists) {
		const template = indexFileTemplate(files, path.split('/').pop() || '');
		writeFileSync(filePath, template);
		log('Wrote file: ' + fileToWrite);
	} else {
		log(`File ${fileToWrite} already exists in catalog ${path} directory. Skipping ..`);
	}
};

const createCatalog = async (path: string, catalogPath: string) => {
	log(`Going over ${path.split('/').pop()}...`);
	const dir: any = readdirSync(path);
	const files = await dir
		.filter((name: string) => {
			const source = join(path, name);
			return lstatSync(source).isDirectory();
		})
		.map((dirName: any) => {
			const compName = toCamelCase(dirName);
			try {
				createCatalogFile(compName, catalogPath);
			} catch (e) {
				log(`Error creating ${compName}!`);
			}

			return {compName, dirName};
		});

	await createIndexFile(files, catalogPath);

	log(`Done with ${path.split('/').pop()}...`);
};

// MAGIC HAPPENS HERE
export const init = async (_: any) => {
	log('Will try to create new items for the catalog.');

	await createCatalog(primitivesPath, catalogPrimitivesPath);

	await createCatalog(compositesPath, catalogCompositesPath);

	await createCatalog(iconsPath, catalogIconsPath);

	log(`✅  Done!`);
};

// tslint:disable-next-line:no-var-requires
const argv = require('minimist')(process.argv.slice(2));
init(argv);
