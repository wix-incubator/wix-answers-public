import { UniDriver } from 'unidriver';
import { TableSortOrder } from './sortable-table-head-cell';
import { createBaseTableHeadCellDriver } from '../base-table-head-cell/driver';

export type SortableTableHeadCellDriver = {
	click: () => Promise<void>;
	getSortOrder: () => Promise<TableSortOrder>;
};

export const createSortableTableHeadCellDriver = (wrapper: UniDriver): SortableTableHeadCellDriver => {
	const base = createBaseTableHeadCellDriver(wrapper);

	return {
		click: () => base.click(),
		getSortOrder: async () => {
			const isSortable = await base.hasClass('sortable');
			const isAsc = await base.hasClass('asc');
			const isDesc = await base.hasClass('desc');

			return isSortable && isAsc ? 'asc' : isSortable && isDesc ? 'desc' : 'none';
		}
	};
};
