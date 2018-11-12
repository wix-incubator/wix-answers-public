import * as React from 'react';
import { createLegacyBaseTableHeadCellDriver } from '../base-table-head-cell/base-table-head-cell.legacy-driver';
import { renderAndMountComponent } from 'answers-lib';
// tslint:disable-next-line:max-line-length
import { TableSortOrder, SortableTableHeadCellProps, SortableTableHeadCell } from './sortable-table-head-cell';

export type LegacySortableTableHeadCellDriver = {
	click: () => void;
	disabled: () => boolean;
	getSortOrder: () => TableSortOrder;
};

export const createLegacySortableTableHeadCellDriver = (wrapper: Element): LegacySortableTableHeadCellDriver => {
	const base = createLegacyBaseTableHeadCellDriver(wrapper);

	return {
		click: () => base.click(),
		disabled: () => base.getClassNames().includes('disabled'),
		getSortOrder: () => {
			const classNames = base.getClassNames();
			const classNamesContain = (name: string) => classNames.indexOf(name) > -1;

			const isSortable = classNamesContain('sortable');
			const isAsc = classNamesContain('asc');
			const isDesc = classNamesContain('desc');

			return isSortable && isAsc ? 'asc' : isSortable && isDesc ? 'desc' : 'none';
		}
	};
};

export const createSortableTableHeadCell = (props: SortableTableHeadCellProps) => {
	const element = renderAndMountComponent(<SortableTableHeadCell {...props} />);
	return createLegacySortableTableHeadCellDriver(element);
};
