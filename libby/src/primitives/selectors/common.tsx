import { BaseProps } from '../../common';

export type SelectOption = {
	value: any;
	label: string | JSX.Element;
	disabled?: boolean;
} & BaseProps;
