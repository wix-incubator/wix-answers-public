
import { Icon } from '../../../primitives';
import * as React from 'react';
// tslint:disable:max-line-length
const svgData = `
	<svg width="27" height="27" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><rect x="10" y="9" width="2" height="9" rx="1"/><rect x="15" y="9" width="2" height="9" rx="1"/></g></svg>
`;

export const PauseIcon = () => <Icon className='pause' icon={svgData} />;
