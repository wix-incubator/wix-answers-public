import * as React from 'react';
import { CatalogGroup } from '..';
import { TextArea, TextAreaProps } from '../..';

export const textAreaCatalogData: CatalogGroup<TextAreaProps> = {
	title: 'Text Area',
	render: (p) => <TextArea {...p}/>,
	items: [
		{
			label: 'Normal',
			props: {
				value: 'Here is some text in a text area'
			}
		},
		{
			label: 'Disabled',
			props: {
				value: 'Here is some text in a text area',
				disabled: true
			}
		}
	]
};
