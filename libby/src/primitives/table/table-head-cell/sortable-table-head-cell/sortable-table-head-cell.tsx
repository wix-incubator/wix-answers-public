import * as React from 'react';
import { BaseTableHeadCell } from '../base-table-head-cell/base-table-head-cell';
import { BaseProps, isPromise } from '../../../../common';
import { Icon } from '../../../icon/icon';
import { iconsMap } from '../../../../icons/processed';
import { EllipsisText } from '../../../../composites/ellipsis-text/ellipsis-text';
import * as classNames from 'classnames';

export type TableSortOrder = 'none' | 'asc' | 'desc';

export type SortClickHandler = (order: TableSortOrder) => (void | Promise<any>);

export type SortableTableHeadCellProps = {
	sortOrder: TableSortOrder;
	onSortOrderChange?: SortClickHandler;
} & BaseProps;

export type SortableTableHeadCellState = {
	isLoading: boolean;
};

export class SortableTableHeadCell extends React.PureComponent<SortableTableHeadCellProps> {
	state = {
		isLoading: false
	};

	stopLoading = () => this.setState({isLoading: false});

	startLoading = () => this.setState({isLoading: true});

	handleSort = () => {
		const currentOrder = this.props.sortOrder;
		const newOrder = currentOrder === 'asc' ? 'desc' : currentOrder === 'desc' ? 'asc' : 'desc';

		const maybePromise = this.props.onSortOrderChange ? this.props.onSortOrderChange(newOrder) : null;

		if (maybePromise && isPromise(maybePromise)) {
			this.startLoading();
			maybePromise.then(this.stopLoading, this.stopLoading);
		}
	}

	render () {
		const {props, state} = this;
		const {isLoading} = state;
		const sortOrder = `${props.sortOrder}`;
		const isDisabled = props.onSortOrderChange ? '' : 'disabled';
		const handleSort = props.onSortOrderChange ? {onClick: this.handleSort} : {};

		const cn = classNames('sortable', sortOrder, props.className, isDisabled, {'is-loading': isLoading});

		return (
			<BaseTableHeadCell className={cn} {...handleSort}>
				<EllipsisText>
					<div className='head-cell-content'>{props.children}</div>
				</EllipsisText>
				<Icon className='sort-arrow' icon={iconsMap.directionArrowDown}/>
			</BaseTableHeadCell>
		);
	}
}
