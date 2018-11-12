import * as React from 'react';
import { CatalogGroup } from '..';
import { InfoMessageBox, AttentionMessageBox, WarningMessageBox, MessageBoxProps } from '../..';

export const messageBoxCatalogData: CatalogGroup<MessageBoxProps> = {
	render: (p) => <InfoMessageBox {...p}>Here is some info for you</InfoMessageBox>,
	title: 'Message Boxes',
	items: [
		{
			label: 'Info',
			render: (p) => <InfoMessageBox {...p}>Here is some info for you</InfoMessageBox>,
			props: {}
		}, {
			label: 'Attention',
			render: (p) => <AttentionMessageBox {...p}>Here is some attention info</AttentionMessageBox>,
			props: {}
		}, {
			label: 'Warning',
			render: (p) => <WarningMessageBox {...p}>Here is a warning for you</WarningMessageBox>,
			props: {}
		}
	]
};
