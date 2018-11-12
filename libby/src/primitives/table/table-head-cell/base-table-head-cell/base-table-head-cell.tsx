import * as React from 'react';
import { BaseProps, noop } from '../../../../common';
import { namespacedClassnames } from '../../../../common/namespace-classes';

export type BaseTableHeadCellProps = {
	onClick?: () => void;
	hideSeperator?: boolean;
} & BaseProps;

export class BaseTableHeadCell extends React.Component<BaseTableHeadCellProps> {
	render () {
		const {props} = this;

		const hideSeperator = props.hideSeperator ? 'hide-seperator' : false;
		const classNames = namespacedClassnames('table-head-cell', hideSeperator, props.className);

		const onCellClickHandler = props.onClick || noop;

		return (
			<div className={classNames} onClick={onCellClickHandler}>
				{props.children}
			</div>
		);
	}
}
