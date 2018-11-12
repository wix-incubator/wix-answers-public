import * as React from 'react';
import { BaseProps } from '../../../../common';
import { BaseTableHeadCell } from '../base-table-head-cell/base-table-head-cell';
import { EllipsisText } from '../../../../composites/ellipsis-text/ellipsis-text';

export type TableHeadCellProps = {
	hideSeperator?: boolean;
} & BaseProps;

export const TableHeadCell = (props: TableHeadCellProps) => {
	const hideSeperator = props.hideSeperator || !!props.children === false;

	return (
		<BaseTableHeadCell className={props.className} hideSeperator={hideSeperator}>
			<EllipsisText>
				<div className='head-cell-content'>{props.children}</div>
			</EllipsisText>
		</BaseTableHeadCell>
	);
};
