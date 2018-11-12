import * as React from 'react';
import { CatalogGroup } from '..';
import {
	Button, AttentionButton, DangerButton,
	ButtonProps, HollowButton, PremiumButton,
	PositiveButton, HollowAttentionButton, HollowDangerButton,
	HollowPositiveButton, HollowPremiumButton
} from '../..';

const buttonDemoGroup = (Comp: any, props: ButtonProps) => (
	<div className='button-demo-group'>
		<Comp {...props} size='small'>Small</Comp>
		<Comp {...props} size='normal'>Normal</Comp>
		<Comp {...props} size='large'>Large</Comp>
		<Comp {...props} size='extra-large'>Extra Large</Comp>
	</div>
);

export const buttonsCatalogData: CatalogGroup<ButtonProps> = {
	render: (p) => buttonDemoGroup(Button, p),
	title: 'Buttons',
	items: [
		{
			label: 'Normal',
			props: {}
		},
		{
			label: 'Normal - Hollow',
			render: (p) => buttonDemoGroup(HollowButton, p),
			props: {}
		},
		{
			label: 'Attention',
			render: (p) => buttonDemoGroup(AttentionButton, p),
			props: {}
		},
		{
			label: 'Attention - Hollow',
			render: (p) => buttonDemoGroup(HollowAttentionButton, p),
			props: {}
		},
		{
			label: 'Danger',
			render: (p) => buttonDemoGroup(DangerButton, p),
			props: {}
		},
		{
			label: 'Danger - Hollow',
			render: (p) => buttonDemoGroup(HollowDangerButton, p),
			props: {}
		},
		{
			label: 'Positive',
			render: (p) => buttonDemoGroup(PositiveButton, p),
			props: {}
		},
		{
			label: 'Positive - Hollow',
			render: (p) => buttonDemoGroup(HollowPositiveButton, p),
			props: {}
		},
		{
			label: 'Premium',
			render: (p) => buttonDemoGroup(PremiumButton, p),
			props: {}
		},
		{
			label: 'Premium - Hollow',
			render: (p) => buttonDemoGroup(HollowPremiumButton, p),
			props: {}
		},
		{
			label: 'Disabled',
			render: (p) => buttonDemoGroup(PremiumButton, p),
			props: {
				disabled: true
			}
		},
		{
			label: 'Disabled - Hollow',
			render: (p) => buttonDemoGroup(HollowButton, p),
			props: {
				disabled: true
			}
		}
	]
};
