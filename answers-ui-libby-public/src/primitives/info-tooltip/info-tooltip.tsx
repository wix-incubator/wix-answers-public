import * as React from 'react';
import { Tooltip } from '../tooltip/tooltip';
import { InfoIcon } from '../../icons/icons-components/info';
import { namespacedClassnames } from '../../common/namespace-classes';
export type InfoTooltipProps = {
	text: JSX.Element | string;
	relativeToBody?: boolean;
};

export const InfoTooltip = (props: InfoTooltipProps) => {
	return (
		<Tooltip body={props.text} relativeToBody={props.relativeToBody} className={namespacedClassnames('info-tooltip')}>
			<InfoIcon/>
		</Tooltip>
	);
};
