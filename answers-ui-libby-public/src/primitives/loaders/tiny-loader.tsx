import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';

export const TinyLoader = () => {
	const classNames = namespacedClassnames('tiny-loader');
	return <div className={classNames}/>;
};
