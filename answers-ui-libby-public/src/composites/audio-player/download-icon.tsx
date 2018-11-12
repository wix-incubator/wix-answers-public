
import { Icon } from '../../primitives';
import * as React from 'react';
// tslint:disable:max-line-length
const svgData = `
	<svg width="27" height="27" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg"><path d="M16 12h3l-4.174 5.656a1 1 0 0 1-1.536 0L9 12h3V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6zM7 22a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2H7z" fill-rule="evenodd"/></svg>
`;

export const DownloadIcon = () => <Icon icon={svgData} />;
