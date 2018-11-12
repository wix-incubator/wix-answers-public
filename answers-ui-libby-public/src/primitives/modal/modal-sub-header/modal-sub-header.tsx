import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { BaseProps } from '../../../common';
import { ModalSize } from '..';

export type ModalSubHeaderProps = {
	size: ModalSize.MEDIUM | ModalSize.LARGE
} & BaseProps;

export const ModalSubHeader = (props: ModalSubHeaderProps) => {
	const sizeClass = props.size === ModalSize.MEDIUM ? 'medium' : 'large';
	const classNames = namespacedClassnames('modal-sub-header', sizeClass, props.className);

	return (
		<div className={classNames}>
			{props.children}
		</div>
	);
};
