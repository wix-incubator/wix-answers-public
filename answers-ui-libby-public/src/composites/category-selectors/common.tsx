import * as React from 'react';
import { FlatCategoryList, FlatCategory } from '../../common';
import { SelectOption, Tooltip } from '../..';

export const MAX_CATEGORY_LABEL_WIDTH = 26;
export const MAX_CATEGORY_VALUE_WIDTH = 22;

export type BaseCategorySelectorProps = {
	categories: FlatCategoryList;
	placeholder: string;
	errorMsg?: string;
	disabled?: boolean;
};

export const renderFlatCatName = (cat: FlatCategory): SelectOption => {
	return {label: `${cat.parentName ? cat.parentName + ' › ' : ''}${cat.name}`, value: cat.id, className: `id-${cat.id}`};
};

export const categoryOptionRenderer = (option: SelectOption) => {
	const shouldRenderTooltip = option.label.toString().length >= MAX_CATEGORY_LABEL_WIDTH;

	const optionComp = (
		<div className={option.className}>
			{option.label}
		</div>
	);

	return shouldRenderTooltip ? (
		<Tooltip body={option.label} relativeToBody={true}>
			{optionComp}
		</Tooltip>
	) : optionComp;
};

export const categoryValueRenderer = (option: SelectOption) => {
	const shouldRenderTooltip = option.label.toString().length >= MAX_CATEGORY_VALUE_WIDTH;

	const optionComp = (
		<div className={option.className}>
			{option.label}
		</div>
	);

	return shouldRenderTooltip ? (
		<Tooltip body={option.label} relativeToBody={true}>
			<div>{optionComp}</div>
		</Tooltip>
	) : optionComp;
};
