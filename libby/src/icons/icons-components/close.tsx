import * as React from 'react';
import { Icon } from '../../primitives/icon/icon';

/* tslint:disable */
const closeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
<path fill-rule="nonzero" d="M5.5 4.086L1.707.293.293 1.707 4.086 5.5.29 9.294l1.415 1.415L5.5 6.914l3.793 3.793 1.414-1.414L6.914 5.5l3.793-3.793L9.293.293 5.5 4.086z"/>
</svg>
`;
export const CloseIcon = () => <Icon icon={closeIcon}/>;
