import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { BaseProps } from '../../../common';

export class TableBody extends React.Component<BaseProps> {
	render () {
		const {props} = this;
		const classNames = namespacedClassnames('table-body');

		return (
			<div className={classNames}>
				{props.children}
			</div>
		);
	}
}
