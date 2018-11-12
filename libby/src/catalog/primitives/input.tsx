import * as React from 'react';
import { CatalogGroup } from '..';
import { Input, InputProps } from '../..';

export const inputCatalogData: CatalogGroup<InputProps> = {
	title: 'Input',
	render: (p) => <Input {...p}/>,
	items: [
		{
			label: 'Normal',
			props: {
				value: 'Hi There!'
			}
		},
		{
			label: 'Disabled',
			props: {
				value: 'Hi There!',
				disabled: true
			}
		},
		{
			label: 'Field With Error',
			props: {
				value: 'Hi There!',
				validationError: 'This value is not valid'
			}
		}
	]
};
