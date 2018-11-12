import * as React from 'react';
import { Text } from '../../typography';
import { namespacedClassnames } from '../../common';
import { Icon } from '../icon/icon';
import { iconsMap } from '../../icons';

export const paginationKey = 'pagination';

export type PaginationProps = {
	page: number;
	numPages: number;
	onPageClick: (page: number) => void;
};

export type PaginationState = {};

export class Pagination extends React.PureComponent<PaginationProps, PaginationState> {

	setGetVisiblePages = () => {
		const props = this.props;
		const lowerBound = props.page - 2;
		const upperBound = props.page + 2;
		const rightPadding = lowerBound < 1 ? Math.abs(lowerBound) + 1 : 0;
		const leftPadding = upperBound > props.numPages ? upperBound - props.numPages : 0;

		const visiblePages = [] as number[];
		for (let i = lowerBound - leftPadding; i <= upperBound + rightPadding; i++) {
			if (i > 0 && i <= props.numPages) {
				visiblePages.push(i);
			}
		}

		return visiblePages;
	}

	goNextPage = () => {
		if (this.props.page < this.props.numPages) {
			this.props.onPageClick(this.props.page + 1);
		}
	}

	goPrevPage = () => {
		if (this.props.page > 1) {
			this.props.onPageClick(this.props.page - 1);
		}
	}

	getPageNumCompByPageNum = (page: number) => {
		const onPageClick = () => {
			this.props.onPageClick(page);
		};
		return (
			<Text
				type='t4a'
				onClick={onPageClick}
				key={page}
				className={'page page-' + page + (this.props.page === page ? ' current' : '')}
			>{page}
			</Text>
		);
	}

	render () {
		const {props} = this;

		const visiblePages = this.setGetVisiblePages();
		const forceShowFirstPage = visiblePages.indexOf(1) === -1;
		const forceShowLastPage = visiblePages.indexOf(props.numPages) === -1;
		let paginationComp;
		if (props.numPages > 1) {
			const paginationFirstPage = forceShowFirstPage ? this.getPageNumCompByPageNum(1) : '';
			const firstDivider = forceShowFirstPage && visiblePages[0] - 1 !== 1 ?
				(<Text type='t4a' className='divider'>. . .</Text>) : '';
			const lastDivider = forceShowLastPage && visiblePages[visiblePages.length - 1] + 1 !== props.numPages ?
				(<Text type='t4a' className='divider'>. . .</Text>) : '';
			const paginationLastPage = forceShowLastPage ? this.getPageNumCompByPageNum(props.numPages) : '';
			const paginationPages = visiblePages.map((page) => {
				return this.getPageNumCompByPageNum(page);
			});

			const classNames = namespacedClassnames('pagination');

			paginationComp = (
				<section className={classNames}>
					<div className='arrow-pagination' onClick={this.goPrevPage}>
						<Icon
							icon={iconsMap.arrowPrev}
							className={this.props.page === 1 ? 'disabled' : ''}
						/>
					</div>
					{paginationFirstPage}
					{firstDivider}
					{paginationPages}
					{lastDivider}
					{paginationLastPage}
					<div className='arrow-pagination' onClick={this.goNextPage}>
						<Icon
							icon={iconsMap.arrowNext}
							className={this.props.page === props.numPages ? 'disabled' : ''}
						/>
					</div>
				</section>
			);
		} else {
			paginationComp = null;
		}

		return paginationComp;
	}
}
