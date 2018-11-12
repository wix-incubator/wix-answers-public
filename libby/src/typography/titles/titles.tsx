import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';

export const LargeTitle = (props: BaseProps) => {
	const className = namespacedClassnames('title', 'large-title', props.className);

	return <h2 className={className}>{props.children}</h2>;
};

export const MediumTitle = (props: BaseProps) => {
	const className = namespacedClassnames('title', 'medium-title', props.className);

	return <h3 className={className}>{props.children}</h3>;
};

export const SmallTitle = (props: BaseProps) => {
	const className = namespacedClassnames('title', 'small-title', props.className);

	return <h4 className={className}>{props.children}</h4>;
};
