import * as React from 'react';
import { TypographyType, typographyTypes, TypographyConfig, defaultTypographyType } from '.';
import { namespacedClassnames } from '../common/namespace-classes';

export type TextProps = {
	onClick?: (e?: any) => void;
	type?: TypographyType,
	className?: string,
	ellipsis?: true | 1 | 2;
	ref?: any;
};

const configToClassName = (c: TypographyConfig): string => {
	return `color-${c.color}`;
};

export class Text extends React.PureComponent<TextProps> {
	render () {
		const {props} = this;
		const type: TypographyType = props.type || defaultTypographyType;
		const config = typographyTypes[type];
		const {ellipsis} = props;
		const ellipsisClass = ellipsis ? `ellipsis-${ellipsis === true ? 1 : props}` : '';
		const cn = namespacedClassnames('text', type, props.className, configToClassName(config), ellipsisClass);

		const style = {
			fontSize: config.size,
			fontWeight: config.weight,
			fontStyle: (config.style || 'normal')
		};
		return <div className={cn} ref={props.ref} onClick={props.onClick} style={style}>{props.children}</div>;
	}
}
