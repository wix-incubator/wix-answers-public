import * as React from 'react';
import { CatalogGroup } from '..';
import { TextAreaAutosize, TextAreaAutosizeProps } from '../..';

export const textAreaAutosizeCatalogData: CatalogGroup<TextAreaAutosizeProps> = {
	title: 'Text Area - Autosize',
	render: (p) => <TextAreaAutosize {...p}/>,
	items: [
		{
			label: 'Normal',
			props: {
				value: 'Set the component value here!'
			}
		}
	]
};
