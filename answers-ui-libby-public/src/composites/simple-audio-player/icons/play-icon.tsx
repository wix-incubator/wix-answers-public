
import { Icon } from '../../../primitives';
import * as React from 'react';
// tslint:disable:max-line-length
const svgData = `
	<svg width="27" height="27" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg"><path d="M12.633 9.307C11.731 8.674 11 9.05 11 10.163v6.64c0 1.105.765 1.517 1.691.93l4.593-2.907c.934-.591.955-1.587.058-2.216l-4.709-3.303z" fill-rule="evenodd"/></svg>
`;

export const PlayIcon = () => <Icon className='play' icon={svgData} />;
