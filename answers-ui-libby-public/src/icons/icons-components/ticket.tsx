import * as React from 'react';
import { Icon } from '../../primitives/icon/icon';

/* tslint:disable */
export const ticketIcon = `
<svg width="14" height="9" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.912V0h14v1.912A2.863 2.863 0 0 0 12.353 4.5c0 1.142.673 2.128 1.647 2.588V9H0V7.088A2.863 2.863 0 0 0 1.647 4.5 2.863 2.863 0 0 0 0 1.912z" fill-rule="evenodd"/></svg>
`;
export const TicketIcon = () => <Icon icon={ticketIcon}/>;
