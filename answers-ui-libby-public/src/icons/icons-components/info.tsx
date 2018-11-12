import * as React from 'react';
import { Icon } from '../../primitives/icon/icon';

/* tslint:disable */
const infoIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<g fill="#7A92A5" fill-rule="nonzero">
	 <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-1a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/>
	 <path d="M11 15V9H9v6zM11 7V5H9v2z"/>
</g>
</svg>
`;

export const InfoIcon = () => <Icon icon={infoIcon}/>;
