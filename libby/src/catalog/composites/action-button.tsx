import * as React from 'react';
import { CatalogGroup } from '..';
import { ActionButton, ActionButtonProps, Icon, iconsMap } from '../..';

const buttonDemo = (Comp: any, props: ActionButtonProps, buttonType: string = 'default') => (
	<div className='button-demo'>
		<Comp {...props} buttonType={buttonType}><Icon icon={iconsMap.buttonDd} /></Comp>
	</div>
);

export const actionButtonCatalogData: CatalogGroup<ActionButtonProps> = {
	render: (p) => buttonDemo(ActionButton, p),
	title: 'Action Buttons',
	items: [
		{
			label: 'Normal',
			props: {
				description: 'some info'
			}
		},
		{
			label: 'Normal - Hollow',
			props: {
				isHollow: true,
				description: 'Description',
			}
		},
		{
			label: 'Positive',
			render: (p) => buttonDemo(ActionButton, p, 'positive'),
			props: {
				description: 'Description'
			}
		},
		{
			label: 'Positive - Hollow',
			render: (p) => buttonDemo(ActionButton, p, 'positive'),
			props: {
				isHollow: true,
				description: 'Description'
			}
		},
		{
			label: 'Attention',
			render: (p) => buttonDemo(ActionButton, p, 'attention'),
			props: {
				description: 'Description'
			}
		},
		{
			label: 'Attention - Hollow',
			render: (p) => buttonDemo(ActionButton, p, 'attention'),
			props: {
				isHollow: true,
				description: 'Description'
			}
		},
		{
			label: 'Danger',
			render: (p) => buttonDemo(ActionButton, p, 'danger'),
			props: {
				description: 'Description'
			}
		},
		{
			label: 'Danger - Hollow',
			render: (p) => buttonDemo(ActionButton, p, 'danger'),
			props: {
				isHollow: true,
				description: 'Description'
			}
		},
		{
			label: 'Special',
			render: (p) => buttonDemo(ActionButton, p, 'special'),
			props: {
				description: 'Description'
			}
		},
		{
			label: 'Special - Hollow',
			render: (p) => buttonDemo(ActionButton, p, 'special'),
			props: {
				isHollow: true,
				description: 'Description'
			}
		},
		{
			label: 'Premium',
			render: (p) => buttonDemo(ActionButton, p, 'premium'),
			props: {
				description: 'Description'
			}
		},
		{
			label: 'Premium - Hollow',
			render: (p) => buttonDemo(ActionButton, p, 'premium'),
			props: {
				isHollow: true,
				description: 'Description'
			}
		},
		{
			label: 'Disabled',
			props: {
				description: '',
				disabled: 'I am disabled'
			}
		}
	]
};
