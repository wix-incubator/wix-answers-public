import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { BaseProps } from '../../../common';
import { TableContext, TableContextConsumer } from '../context';

export type TableRowProps = {
	onClick?: () => void;
	fullWidthRow?: boolean;
} & BaseProps;

export class TableRow extends React.Component<TableRowProps> {
	renderTableRow = (context: TableContext) => {
		const {props} = this;
		const isClickable = !!props.onClick;
		const classNames = namespacedClassnames('table-row', props.className, isClickable ? 'clickable' : '');

		const gridStyle = {
			gridTemplateColumns: this.props.fullWidthRow ? '100%' : context.colWidths.join(' ')
		};

		return (
			<div className={classNames} onClick={props.onClick} style={gridStyle}>
				{props.children}
			</div>
		);
	}

	render () {
		return (
			<TableContextConsumer render={this.renderTableRow}/>
		);
	}
}
