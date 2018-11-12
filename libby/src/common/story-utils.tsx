import * as React from 'react';

export type ColumnProps = {
	title?: string;
	style?: any;
	children?: any;
};

export const Column = (props: ColumnProps) => {
	return (
	<span className='column' style={props.style}>
		{props.title ? <h5 className='h5-title'>{props.title}</h5> : null}
		{props.children}
	</span>);
};
