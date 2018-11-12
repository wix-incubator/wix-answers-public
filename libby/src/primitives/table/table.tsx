import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import { TableContextProvider, ColWidths } from './context';

export const TableContainer = (props: BaseProps) => {
	const classNames = namespacedClassnames('table');

	return (
		<div className={classNames + (props.className ? ` ${props.className}` : '')}>
			{props.children}
		</div>
	);
};

export type TableProps = {
	colWidths: ColWidths;
	isEmpty?: boolean;
} & BaseProps;

export class Table extends React.PureComponent<TableProps> {
	render () {
		const {props} = this;
		const classNames = namespacedClassnames('table-contents', {'is-empty': !!props.isEmpty}, props.className);

		return (
			<TableContextProvider colWidths={props.colWidths}>
				<div className={classNames}>
					{props.children}
				</div>
			</TableContextProvider>
		);
	}
}
