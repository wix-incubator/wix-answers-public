import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import * as classnames from 'classnames';

export interface ContainerProps extends BaseProps {
	secondary?: true;
}

export class Container extends React.PureComponent<ContainerProps, {}> {
	render () {
		const {props} = this;
		const defaultClasses = namespacedClassnames('container', {secondary: props.secondary});
		const classNames = classnames(defaultClasses, props.className);
		return <div className={classNames}>{props.children}</div>;
	}
}
