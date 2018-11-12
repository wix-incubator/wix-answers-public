import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';

export type SpinnerLoaderProps = {
	color?: string;
};

export const SpinnerLoader = (props: SpinnerLoaderProps) => {
	const classNames = namespacedClassnames('spinner-loader');
	const style = !!props.color ? {
		background: props.color
	} : {};

	return (
		<div className={classNames}>
			<div className='bounce1' style={style}/>
			<div className='bounce2' style={style}/>
			<div className='bounce3' style={style}/>
		</div>
	);
};
