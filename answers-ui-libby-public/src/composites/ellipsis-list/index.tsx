import * as React from 'react';
import { namespacedClassnames, BaseProps } from '../../common';
import { Tooltip } from '../../primitives';
import { ResizeObserverHandler, createResizeObserver } from '../../common/resize-observer';
import * as classNames from 'classnames';

export const ellipsisListKey = 'ellipsis-list';

export type EllipsisListProps = {
	tooltipRelativeToBody?: boolean;
	delimiter?: string;
} & BaseProps;

export type EllipsisListItem = {
	index: number;
	width: number;
	xOffset: number;
	elem: Element | null;
};

export type EllipsisListState = {
	visibleCount: number;
};

export class EllipsisList extends React.PureComponent<EllipsisListProps, EllipsisListState> {
	state: EllipsisListState = {
		visibleCount: 0
	};

	counterWidth = 60;
	listContainer: HTMLElement | null = null;
	listItems: EllipsisListItem[] = [];
	allItemsMeasured = false;

	resizeObserver: ResizeObserverHandler = createResizeObserver((w) => this.onResize(w));

	componentWillUnmount () {
		this.resizeObserver.clean();
	}

	updateVisibleCount = (listWidth: number) => {
		if (this.listContainer) {
			const visibleCount = this.listItems.reduce((res, item) => {
				return item.width + item.xOffset + this.counterWidth < listWidth ? res + 1 : res;
			}, 0);

			if (visibleCount !== this.state.visibleCount) {
				this.setState({visibleCount});
			}
		}
	}

	onResize = (width: number) => this.updateVisibleCount(width);

	measureListItem = (index: number) => (elem: HTMLElement | null) => {
		if (!this.allItemsMeasured && elem && elem.parentElement) {
			const width = elem.clientWidth;
			const xOffset = elem.offsetLeft - elem.parentElement.offsetLeft;

			const listItem: EllipsisListItem = {
				index, width, xOffset, elem
			};

			this.listItems.push(listItem);

			// If this was the last child, all children are now measured
			if (index === React.Children.count(this.props.children) - 1) {
				this.allItemsMeasured = true;
			}
		}
	}

	registerListContainer = (elem: HTMLElement | null) => {
		if (elem) {
			this.listContainer = elem;
			this.resizeObserver.observeElem(elem);
			this.updateVisibleCount(elem.clientWidth);
		}
	}

	renderListItem = (item: React.ReactChild, idx: number, measured: boolean) => {
		const cn = classNames('ellipsis-list-item', {measured});
		const ref = !measured ? this.measureListItem(idx) : undefined;
		const totalVisible = this.state.visibleCount;
		const showDelimiter = idx < totalVisible - 1;

		return (
			<li key={idx} className={cn} ref={ref}>
				{item}
				{showDelimiter ? this.props.delimiter : null}
			</li>
		);
	}

	renderHiddenListItem = (item: React.ReactChild, idx: number) => {
		const totalHidden = React.Children.count(this.props.children) - this.state.visibleCount;
		const showDelimiter = idx < totalHidden - 1;
		return (
			<span key={idx} className='hidden-list-item'>
				{item}
				{showDelimiter ? this.props.delimiter : null}
			</span>
		);
	}

	render () {
		const {props, state} = this;
		const childrenArray = React.Children.toArray(props.children);

		const unmeasuredListItems = childrenArray.map((child, idx) => this.renderListItem(child, idx, false));

		const visibleListItems = childrenArray.slice(0, state.visibleCount)
			.map((child, idx) => this.renderListItem(child, idx, true));

		const hiddenListItems = childrenArray.slice(state.visibleCount);
		const tooltipBody = (
			<div className='hidden-items-list'>
				{hiddenListItems.map((child, idx) => this.renderHiddenListItem(child, idx))}
			</div>
		);

		const hiddenItemsContainer = hiddenListItems.length ? (
			<div className='hidden-count-container'>
				<Tooltip body={tooltipBody} relativeToBody={props.tooltipRelativeToBody}>
					...<span className='counter'>(+{hiddenListItems.length})</span>
				</Tooltip>
			</div>
		) : null;

		const cn = namespacedClassnames(ellipsisListKey);

		return (
			<div className={cn}>
				<ul className='visible-list' ref={this.registerListContainer}>
					{!this.allItemsMeasured ? unmeasuredListItems : null}
					{this.allItemsMeasured ? visibleListItems : null}
					{hiddenItemsContainer}
				</ul>
			</div>
		);
	}
}
