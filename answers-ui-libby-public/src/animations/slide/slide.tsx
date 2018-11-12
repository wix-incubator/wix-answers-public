import * as React from 'react';
import { BaseAnimationProps } from '../opacity/opacity';
import { HeightAnimation } from '../height/height';
import { namespacedClassnames } from '../../common/namespace-classes';

export type SlideAnimationProps = BaseAnimationProps;

export const SlideAnimation = (props: SlideAnimationProps) => {
	const animationClass = 'slide';
	const showOrHide = props.show ? 'show' : 'hide';
	const classNames = namespacedClassnames(animationClass, showOrHide);

	return (
		<HeightAnimation show={props.show}>
			<div className={classNames}>
				{props.children}
			</div>
		</HeightAnimation>
	);
};
