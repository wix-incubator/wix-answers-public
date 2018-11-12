import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { BaseProps } from '../../../common';

export type TableCellProps = {
	width?: string;
	actionsCell?: true;
	onClickActionCell?: () => void
} & BaseProps;

export class TableCell extends React.Component<TableCellProps> {
	render () {
		const {props} = this;
		const isActionCell = props.actionsCell ? 'actions-cell' : '';
		const classNames = namespacedClassnames(props.className, 'table-cell', isActionCell);

		const style = {
			width: props.width
		};
		const clickActionsCell = (e?: any) => {
			if (props.actionsCell && props.onClickActionCell) {
				e.preventDefault();
				e.stopPropagation();
				props.onClickActionCell();
			}
		};

		return (
			<div className={classNames} style={style} onClick={clickActionsCell}>
				{props.children}
			</div>
		);
	}
}
