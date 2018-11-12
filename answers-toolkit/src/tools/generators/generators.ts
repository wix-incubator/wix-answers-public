import { lispCase } from './utils';

import * as templates from './templates/templates';

export type CodeFile = {
	content: string;
	fileName: string;
};

export type ComponentCodeData = {
	style: CodeFile,
	driver: CodeFile,
	component: CodeFile,
	test: CodeFile
};

export const generateComponentContent = (compName: string, translationsNs: string): ComponentCodeData => {

	const lispedCompName = lispCase(compName);

	return {
		style: {
			content: templates.style(lispedCompName),
			fileName: `_style.scss`
		},
		component: {
			content: templates.component(compName, translationsNs),
			fileName: `index.tsx`
		},
		driver: {
			content: templates.driver(compName),
			fileName: `driver.tsx`
		},
		test: {
			content: templates.test(compName),
			fileName: `spec.tsx`
		}
	};
};
