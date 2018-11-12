import * as classnames from 'classnames';

export const namespaceClassName = 'aul';

export const namespacedClassnames = (...args: any[]) => {
	return classnames(namespaceClassName, args);
};
