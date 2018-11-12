import { TableContext } from '.';
import * as React from 'react';
import * as propTypes from 'prop-types';

export type TableContextConsumerProps = {
	render: (context: TableContext) => JSX.Element;
};

export class TableContextConsumer extends React.Component<TableContextConsumerProps> {
	static contextTypes = {
		colWidths: propTypes.arrayOf(propTypes.string)
	};

	context: TableContext;
	defaultTableContext: TableContext = {
		colWidths: [],
	};

	constructor (props: any, context: TableContext) {
		super(props, context);
		this.context = context;
	}

	createConsumedContext = (): TableContext => {
		const definedContext = Object.keys(this.context).reduce((res, currKey) => {
			const context: any = this.context;
			return !!context[currKey] ? {...res, [currKey]: context[currKey]} : res;
		}, {});

		return {...this.defaultTableContext, ...definedContext};
	}

	render () {
		const ctx: TableContext = this.createConsumedContext();
		return this.props.render(ctx);
	}
}
