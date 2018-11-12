import * as React from 'react';
// tslint:disable-next-line:max-line-length
import { LegacyBaseTableHeadCellDriver, createLegacyBaseTableHeadCellDriver } from '../base-table-head-cell/base-table-head-cell.legacy-driver';
import { TableHeadCellProps, TableHeadCell } from './table-head-cell';
import { renderAndMountComponent } from 'answers-toolkit';
export type LegacyTableHeadCellDriver = LegacyBaseTableHeadCellDriver;

export const createLegacyTableHeadCellDriver = (wrapper: Element): LegacyTableHeadCellDriver => {
	return createLegacyBaseTableHeadCellDriver(wrapper);
};

export const createTableHeadCell = (props: TableHeadCellProps) => {
	const element = renderAndMountComponent(<TableHeadCell {...props} />);
	return createLegacyTableHeadCellDriver(element);
};
