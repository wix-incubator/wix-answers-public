import * as React from 'react';
import { namespacedClassnames } from '../common/namespace-classes';
import { BaseProps } from '../common';

// BETTER USE ELLIPSIS ON TEXT!

export const EllipsisTextOld = (props: BaseProps) => {
	const className = namespacedClassnames('text', 'ellipsis-text', props.className);
	const innerTextParagraph = typeof(props.children) === 'string' ? <p>{props.children}</p> : props.children;

	return <span className={className}>{innerTextParagraph}</span>;
};
