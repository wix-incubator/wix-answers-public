import * as React from 'react';
import { Icon } from '../../primitives/icon/icon';

/* tslint:disable */
const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
<g fill="none" fill-rule="evenodd">
	 <circle cx="11.5" cy="11.5" r="11.5" fill="#3899EC"/>
	 <path fill="#FFF" d="M12 11V6h-1v5H6v1h5v5h1v-5h5v-1h-5z"/>
</g>
</svg>
`;
export const PlusWithBgIcon = () => <Icon icon={icon}/>;

