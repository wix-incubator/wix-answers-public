import { BaseProps, namespacedClassnames } from '../../common';
import * as React from 'react';

export type IconProps = {
	icon: string;
} & BaseProps;

export const Icon: React.SFC<IconProps> = (props) => {

	const html = {__html: props.icon};
	const className = namespacedClassnames('icon', 'svg-icon', props.className);
	return (
		<span className={className} dangerouslySetInnerHTML={html} />
	);
};
