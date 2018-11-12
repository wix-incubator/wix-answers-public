import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { BaseProps } from '../../../common';
import { TableContext, TableContextConsumer } from '../context';

export class TableHead extends React.PureComponent<BaseProps> {
	renderTableHead = (context: TableContext) => {
		const {props} = this;
		const classNames = namespacedClassnames('table-head', props.className);

		const gridStyle = {
			gridTemplateColumns: context.colWidths.join(' ')
		};

		return (
			<div className={classNames} style={gridStyle}>
				{props.children}
			</div>
		);
	}

	render () {
		return (
			<TableContextConsumer render={this.renderTableHead}/>
		);
	}
}
