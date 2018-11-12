import { namespacedClassnames } from '../../common/namespace-classes';
import {createKeyHandledList, KeyHandledListItem, withMeta} from './key-handled-list/key-handled-list.comp';

import * as React from 'react';
import { BaseProps } from '../../common';
import { Loader } from '../../primitives/loaders/loader/loader';
import { debounce } from '../../todo-move-to-lib';

export type FloaterSelectState<T> = {
	loading: boolean;
	items: T[];
	term: string;
	visible?: boolean;
};

const searchCount = 10;
const searchOffset = 0;

// todo - move to even more common! this is a common very repeating thing
export type FloaterSearchFn<T> = (term: string, count?: number, offset?: number) => Promise<T[]>;

export type FloaterSelectItem<T extends withMeta> = KeyHandledListItem<T>;

export type FloaterSelectProps<T extends withMeta> = {
	onFocus?: () => void,
	onBlur?: () => void,
	search: FloaterSearchFn<T>,
	ItemRenderer: FloaterSelectItem<T>,
	debounceDelay?: number,
	placeholderText: string,
	onSelect: (item: T, event: any) => any,
	autoFocus?: boolean,
	noResults: any,
	emptyState?: any,
	listVisible?: boolean,
	dropdownMode?: boolean
} & BaseProps;

export class FloaterSelect<T extends withMeta> extends React.Component<FloaterSelectProps<T>, FloaterSelectState<T>> {
	doSearchDebounce = debounce((
		term: string,
		count: number,
		offset: number
	) => this.search(term, count, offset), this.props.debounceDelay || 200) as (s: string, c: number, o: number) => any;

	state: FloaterSelectState<T> = {
		items: [],
		loading: true,
		term: ''
	};

	keyHandledList: any = null;

	recreateList = (items: T[]) => {
		const ItemRenderer = this.props.ItemRenderer;
		const onSelect = (item: T, e: any) => {
			if (!item.disabled) {
				this.props.onSelect(item, e);
				this.search(this.state.term, searchCount, searchOffset);
			}
		};

		const Wrapper: KeyHandledListItem<T> = (props) => {
			const handleSelect = (e: any) => onSelect(props.item, e);
			return (
			<li
				onMouseDown={handleSelect}
				onTouchStart={handleSelect}
				key={props.index}
				className={namespacedClassnames('floater-select-item', {selected: props.selected, disabled: props.item.disabled})}
			>
				<ItemRenderer {...props}/>
			</li>);
		};
		this.keyHandledList = createKeyHandledList(items, Wrapper, onSelect);
	}

	componentWillMount () {
		this.search('', searchCount, searchOffset);
	}

	search = async (term: string, count: number, offset: number) => {
		this.setState({loading: true, term});
		const items = await this.props.search(term, count, offset);
		this.recreateList(items);
		this.setState({loading: false, items});
	}

	onSearchChange = (e: any) => {
		this.doSearchDebounce(e.target.value, searchCount, searchOffset);
	}

	handleKeyPress = (e: any) => {
		if (this.keyHandledList) {
			this.keyHandledList.keyHandler(e);
		}
	}

	renderKeyHandledList = () => {

		const RenderedList = this.keyHandledList.component;
		return <RenderedList />;
	}

	render () {
		const key = 'floater-select';
		const classNames = namespacedClassnames(key, this.props.className);
		const isLoading = this.state.loading;
		const hasResults = this.state.items.length !== 0;
		const noResults = <div className='no-results'>{this.props.noResults}</div>;
		const emptyState = this.props.emptyState ? <div className='empty-state'>{this.props.emptyState}</div> : noResults;

		const noResultsComp = this.state.term ? noResults : emptyState;

		const listVisible = this.props.listVisible !== false;

		// tslint:disable-next-line:max-line-length
		const renderList = () => (
		<div className={namespacedClassnames('list-container')}>
		{(isLoading ? <Loader isCentered={true}/> : hasResults ? this.renderKeyHandledList() : noResultsComp)}
		</div>);

		return (
		<div className={classNames}>
			<input
				onBlur={this.props.onBlur}
				onFocus={this.props.onFocus}
				className={namespacedClassnames('search-field')}
				onChange={this.onSearchChange}
				placeholder={this.props.placeholderText}
				onKeyDown={this.handleKeyPress}
				autoFocus={this.props.autoFocus}
			/>
			{listVisible ? renderList() : null}
		</div>
		);
	}
}
