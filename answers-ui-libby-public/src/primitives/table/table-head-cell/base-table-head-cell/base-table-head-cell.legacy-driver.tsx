import * as React from 'react';
import { BaseTableHeadCellProps, BaseTableHeadCell } from './base-table-head-cell';
import { getLegacyBaseDriverFromWrapper } from '../../../../common/base-driver';
import { renderAndMountComponent } from 'answers-toolkit';

export type LegacyBaseTableHeadCellDriver = {
	click: () => void;
	getClassNames: () => string[];
};

export const createLegacyBaseTableHeadCellDriver = (wrapper: Element): LegacyBaseTableHeadCellDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.table-head-cell', BaseTableHeadCell.name);

	return {
		click: () => baseDriver.click(),
		getClassNames: () => baseDriver.elem.className.split(' ')
	};
};

export const createBaseTableHeadCell = (props: BaseTableHeadCellProps) => {
	const element = renderAndMountComponent(<BaseTableHeadCell {...props} />);
	return createLegacyBaseTableHeadCellDriver(element);
};
