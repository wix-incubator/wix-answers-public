import * as React from 'react';
import { Input } from '../../primitives/input/input';
import { namespacedClassnames } from '../../common/namespace-classes';
import { XIcon, SearchIcon } from '../..';
import * as classNames from 'classnames';

export type SearchInputProps = {
	query: string;
	disabled?: boolean;
	placeholder?: string;
	onSearch: (query: string) => void;
	onReset: () => void;
};

export const searchInputKey = 'search-input';

export class SearchInput extends React.Component<SearchInputProps, any> {

	state = {
		isFocused: false,
		hasValue: false
	};

	onChange = (query: string) => {
		this.setState({hasValue: !!query.length});
		this.props.onSearch(query);
	}
	onFocus = () => this.setState({isFocused: true});
	onBlur = () => this.setState({isFocused: false});

	render () {
		const {query, disabled, placeholder} = this.props;
		const {isFocused} = this.state;

		const inputClassNames = classNames(!!query ? 'has-value' : null, isFocused ? 'is-focused' : null);
		const searchInputClassNames = namespacedClassnames(searchInputKey, disabled ? 'is-disabled' : null);

		const resetSearchBtn = !query ? null : (
			<span className='reset-search-btn' onClick={this.props.onReset}>
				<XIcon/>
			</span>
		);

		return (
			<span className={searchInputClassNames}>
				<SearchIcon/>
				<Input
					className={inputClassNames}
					value={query}
					onChange={this.onChange}
					disabled={disabled}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					placeholder={placeholder}
				/>
				{resetSearchBtn}
			</span>
		);
	}
}
