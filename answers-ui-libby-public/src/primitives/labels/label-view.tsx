import { BaseProps, namespacedClassnames, LabelData } from '../../common';
import * as React from 'react';

export type LabelViewProps = {
	label: LabelData;
	onRemove?: (label: LabelData, event?: any) => void;
} & BaseProps;

export const labelViewKey = 'label-view';

export const LabelView = ({label, onRemove}: LabelViewProps) => {
	const classNames = namespacedClassnames(labelViewKey, {removable: !!onRemove});
	const localOnRemove = onRemove ? (e: any) => onRemove(label, e) : undefined;
	return <div onClick={localOnRemove} className={classNames}>{label.name}</div>;
};
