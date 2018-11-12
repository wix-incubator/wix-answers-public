import * as React from 'react';
import { CatalogGroup } from '..';
import { CodeEditor, CodeEditorProps } from '../..';

export const codeEditorCatalogData: CatalogGroup<CodeEditorProps> = {
	render: (p) => <CodeEditor {...p}/>,
	title: 'Code Editor',
	items: [
		{
			label: 'JavaScript Editor',
			props: {
				value: `console.log('hello there!')`,
				mode: 'javascript'
			}
		}
	]
};
