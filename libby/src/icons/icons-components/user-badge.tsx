import * as React from 'react';
import { Icon } from '../../primitives/icon/icon';

/* tslint:disable */
const large = `
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="12">
	<g fill="#627B8E" fill-rule="evenodd">
	<circle cx="5" cy="3" r="3"/>
	<path d="M9.8 7.2V12H.2V7.2z"/>
	</g>
</svg>
`;


/* tslint:disable */
const normal = `
<svg xmlns="http://www.w3.org/2000/svg" width="8" height="10">
	<g fill="#6D8699" fill-rule="evenodd">
		<circle cx="4" cy="2.5" r="2.5"/>
		<path d="M8 6v4H0V6z"/>
	</g>
</svg>
`;

/* tslint:disable */
const small = `
<svg xmlns="http://www.w3.org/2000/svg" width="6" height="8">
	<g fill="#6D8699" fill-rule="evenodd">
		<circle cx="3" cy="2" r="2"/>
		<path d="M6 5v3H0V5z"/>
	</g>
</svg>
`;


const iconsMap = {small, normal, large};

export const UserBadgeIcon: React.SFC<{size: 'small' | 'normal' | 'large'}> = (props) => (
	<Icon className={`user-badge ${props.size}`} icon={iconsMap[props.size]}/>
);
