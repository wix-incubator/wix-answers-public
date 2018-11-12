import { readFileSync, writeFile, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { lispCase } from 'answers-lib/dist/tools/generators/utils';
// tslint:disable-next-line:no-var-requires
const chalk = require('chalk');
// tslint:disable-next-line:no-var-requires
const SVGO = require('svgo');

const cwd = process.cwd();
const rawIconsPath = join(cwd, 'src/icons/raw');
const processedIconsPath = join(cwd, 'src/icons/processed');

const log = (msg: string) => {
	// tslint:disable-next-line:no-console
	console.log(`[Icon Builder] ${msg}`);
};

const logError = (msg: string) => log(chalk.red(msg));
const logOk = (msg: string) => log(chalk.green(msg));

const iconFileTemplate = (svgData: string) => `
/* tslint:disable */

const icon: string = \`
${svgData}
\`;

export = icon;
`;

const indexFileTemplate = (iconFiles: IconFile[]) => `
${iconFiles.map((item) => `import * as ${item.iconName} from './${item.fileName}';`).join('\n')}

export type IconMap = {
	${iconFiles.map((item) => `${item.iconName}: string;`).join('\n\t')}
};

export const iconsMap: IconMap = {
	${iconFiles.map((item) => `${item.iconName}`).join(',\n\t')}
};
`;

export type IconFile = {
	iconName: string;
	fileName: string;
};

const createTsFile = (svgData: string, fileName: string) => {
	const template = iconFileTemplate(svgData);

	const fileToWrite = fileName + '.ts';
	writeFileSync(join(processedIconsPath, fileToWrite), template);
	log('Wrote file: ' + fileToWrite);
};

const toCamelCase = (text: string) => {
	return text.replace(/(\-[a-z])/g, (match) => match.toUpperCase().replace('-', ''));
};

const idPrefixPlugin = (fileName: string) => {
	return {
		cleanupIDs: {
			prefix: {
				toString (): string {
					return `id-${fileName}`;
				}
			}
		}
	};
};

export const init = async (args: any) => {
	const path = args.path;
	log(`Your lovely icon wizard will now look for .svg files in ${path} ...`);

	const writtenIconNames: IconFile[] = [];

	const fileNames: any = readdirSync(rawIconsPath);
	await fileNames.forEach((fileName: any) => {
		const iconName = toCamelCase(fileName.split('.')[0]);
		const lispFileName = lispCase(iconName) + '.svg';
		const extension = fileName.split('.').reverse()[0];

		const SVGOPugins = {plugins: [idPrefixPlugin(lispCase(iconName))]};

		if (extension === 'svg') {
			try {
				const svgData = readFileSync(join(rawIconsPath, fileName), 'utf8');
				new SVGO(SVGOPugins).optimize(svgData)
					.then((optimizedSvg: any) => {
						createTsFile(optimizedSvg.data, lispFileName);
						writtenIconNames.push({
							iconName,
							fileName: lispFileName
						});
					});
			} catch (e) {
				logError(`Error writing file for ${fileName}`);
			}
		} else {
			log(`File ${fileName} is not an .svg file. Skipping.`);
		}
	});

	writeFile(join(processedIconsPath, 'index.ts'), indexFileTemplate(writtenIconNames), () => {
		logOk(`✅  Done!`);
		logOk(`Added ${writtenIconNames.length} icons to index.ts`);
	});
};

// tslint:disable-next-line:no-var-requires
const argv = require('minimist')(process.argv.slice(2));
init(argv);
