import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';

export type ModalFooterProps = {
	children?: any;
};

export const ModalFooter = (props: ModalFooterProps) => {
	const classNames = namespacedClassnames('modal-footer');

	return (
		<div className={classNames}>
			{props.children}
		</div>
	);
};
