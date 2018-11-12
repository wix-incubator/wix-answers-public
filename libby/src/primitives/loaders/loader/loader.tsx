
import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';

export type LoaderProps = {
	isCentered?: boolean
};

export const Loader = (props: LoaderProps) => {
	const classNames = namespacedClassnames('loader', {centered: props.isCentered});

	return (
		<div className={classNames}>
			<div className='loader-inner'/>
			<div className='loader-inner delayed'/>
		</div>
	);
};
