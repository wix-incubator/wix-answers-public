import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps, ValueCompProps } from '../../common';
import * as classnames from 'classnames';
import { Checkbox } from '../../primitives/checkbox/checkbox';
import { Input } from '../../primitives/input/input';
import { Text } from '../../typography';

export const CheckboxGroupKey = 'checkbox-group';

export type CheckboxGroupValue<T> = Map<T, boolean>;

export type CheckboxGroupItem = {
	id: string,
	label: string,
	customElement?: JSX.Element
};

export type CheckboxGroupMeta = {
	items: CheckboxGroupItem[];
	maxSelections?: number;
	maxSelectionsText?: string;
	minSelections?: number;
	searchPlaceholder?: string;
} & BaseProps;

export type CheckboxGroupProps = ValueCompProps<CheckboxGroupValue<string>, CheckboxGroupMeta>;

export type CheckboxGroupState = {
	isScrolled: boolean;
	searchTerm: string;
	filteredIds: string[];
};

export class CheckboxGroup extends React.PureComponent<CheckboxGroupProps, CheckboxGroupState> {
	minItemsForSearch = 7;

	state: CheckboxGroupState = {
		isScrolled: false,
		searchTerm: '',
		filteredIds: []
	};

	valueChangeHandler = (id: string) => (newVal: boolean) => {
		const map = new Map(this.props.value.entries());
		map.set(id, newVal);
		this.props.onChange(map);
	}

	handleScroll = (e: any) => {
		const {state} = this;
		if (e.target.scrollTop > 0 && !state.isScrolled) {
			this.setState({isScrolled: true});
		} else if (e.target.scrollTop === 0 && state.isScrolled) {
			this.setState({isScrolled: false});
		}
	}

	renderCheckboxListItem = (item: CheckboxGroupItem, disabledState: string | boolean) => {
		const value = this.props.value.get(item.id);
		const cn = classnames('checkboxes-list-item', {disabled: !!disabledState});

		return value !== undefined ? (
			<li className={cn} key={item.id}>
				<Checkbox disabled={disabledState} value={value} onChange={this.valueChangeHandler(item.id)}>
					<div className='checkbox-label'>{item.customElement || item.label}</div>
				</Checkbox>
			</li>
		) : null;
	}

	renderCheckboxes = () => {
		const checkedCount = this.props.items.filter((item) => !!this.props.value.get(item.id)).length;
		const maxLimitReached = this.props.maxSelections !== undefined && checkedCount >= this.props.maxSelections;
		const minLimitReached = this.props.minSelections !== undefined && checkedCount <= this.props.minSelections;

		const filteredItems = this.props.items.filter((item) =>
			item.label.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1
		);

		const items = filteredItems.map((item) => {
			const isUnchecked = this.props.value.get(item.id) === false;
			const isDisabled = (isUnchecked && maxLimitReached) || (!isUnchecked && minLimitReached);
			const disabledState = isDisabled ?
				maxLimitReached ? (this.props.maxSelectionsText || true) : minLimitReached : false;

			return this.renderCheckboxListItem(item, disabledState);
		});

		const maybeEmptyState = !items.length ? (
			<li className='empty-state-item'>
				<Text>No results to show</Text>
			</li>
		) : null;

		return (
			<ul className='checkboxes-list' onScroll={this.handleScroll}>
				{items}
				{maybeEmptyState}
			</ul>
		);
	}

	onSearchTermChange = (term: string) => this.setState({searchTerm: term});

	render () {
		const {props, state} = this;
		const classNames = namespacedClassnames(CheckboxGroupKey, props.className, {scrolled: state.isScrolled});

		const searchInput = (
			<Input
				className='search-field'
				placeholder={props.searchPlaceholder || 'Search'}
				value={state.searchTerm}
				onChange={this.onSearchTermChange}
			/>
		);

		return (
			<div className={classNames}>
				{props.items.length >= this.minItemsForSearch ? searchInput : null}
				{this.renderCheckboxes()}
			</div>
		);
	}
}
