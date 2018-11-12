import * as React from 'react';
import { Icon } from '../../primitives/icon/icon';

const iconData = `
<svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
    <g>
        <path d="M10.382 11.1a6 6 0 1 1 .755-.996L15 12.998l-.75 1-3.868-2.9zM6 12A5 5 0 1 0 6 2a5 5 0 0 0 0 10z"/>
    </g>
</svg>
`;

export const SearchIcon = () => <Icon className='search-icon' icon={iconData}/>;
