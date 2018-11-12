
import { Icon } from '../../primitives';
import * as React from 'react';
// tslint:disable:max-line-length
const svgData = `
	<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M4.707 4l2.475-2.475-.707-.707L4 3.293 1.525.818l-.707.707L3.293 4 .818 6.475l.707.707L4 4.707l2.475 2.475.707-.707L4.707 4z" fill-rule="evenodd"/></svg>
`;

export const SpeedIcon = () => <Icon icon={svgData} />;
