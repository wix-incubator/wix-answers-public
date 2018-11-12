import * as React from 'react';
import * as classnames from 'classnames';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { BaseProps } from '../../../common';

export const ContainerSection = (props: BaseProps) => {
	const defaultClasses = namespacedClassnames('container-section');
	const classNames = classnames(defaultClasses, props.className);

	return <div className={classNames}>{props.children}</div>;
};
