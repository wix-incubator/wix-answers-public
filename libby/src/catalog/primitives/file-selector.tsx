import * as React from 'react';
import { CatalogGroup } from '..';
import { FileSelector, FileSelectorProps } from '../..';

export const fileSelectorCatalogData: CatalogGroup<FileSelectorProps> = {
	title: 'File Selector',
	render: (p) => <FileSelector {...p}>Click</FileSelector>,
	items: [
		{
			label: 'JPG & PNG Support',
			props: {
				supportedFileTypes: ['jpg', 'png'],
				onFileSelect: (file) => alert(`selected ${file.name}`)
			}
		}
	]
};
