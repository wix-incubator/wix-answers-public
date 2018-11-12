import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';

export type BaseAnimationProps = {
	show: boolean;
	children?: any;
} & BaseProps;

export type OpacityAnimationProps = BaseAnimationProps;

export const OpacityAnimation = (props: OpacityAnimationProps) => {
	const animationClass = 'opacity';
	const showOrHide = props.show ? 'show' : 'hide';

	const classNames = namespacedClassnames(animationClass, showOrHide);

	return (
		<div className={classNames}>{props.children}</div>
	);
};
