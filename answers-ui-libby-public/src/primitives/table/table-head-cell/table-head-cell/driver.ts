import { UniDriver } from 'unidriver';
import { createBaseTableHeadCellDriver, BaseTableHeadCellDriver } from '../base-table-head-cell/driver';

export type TableHeadCellDriver = BaseTableHeadCellDriver;

export const createTableHeadCellDriver = (wrapper: UniDriver): BaseTableHeadCellDriver => {
	const base = createBaseTableHeadCellDriver(wrapper);

	return {
		click: () => base.click(),
		hasClass: base.hasClass
	};
};
