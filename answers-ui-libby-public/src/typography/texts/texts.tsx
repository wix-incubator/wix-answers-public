import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';

export const DescriptionText = (props: BaseProps) => {
	const className = namespacedClassnames('text', 'description-text', props.className);

	return <p className={className}>{props.children}</p>;
};

export const LightDescriptionText = (props: BaseProps) => {
	const className = namespacedClassnames('text', 'light-description-text', props.className);

	return <p className={className}>{props.children}</p>;
};
