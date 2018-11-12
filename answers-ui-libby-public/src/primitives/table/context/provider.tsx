import { ColWidths, TableContext } from '.';
import { BaseProps } from '../../../common';
import * as React from 'react';
import * as propTypes from 'prop-types';

export type TableContextProviderProps = {
	colWidths: ColWidths;
} & BaseProps;

export class TableContextProvider extends React.Component<TableContextProviderProps, any> {
	static tableContextTypes = {
		colWidths: propTypes.arrayOf(propTypes.string)
	};

	static childContextTypes = TableContextProvider.tableContextTypes;

	getChildContext (): TableContext {
		return {
			colWidths: this.props.colWidths
		};
	}

	render () {
		return React.Children.only(this.props.children);
	}
}
