import {BasePopover, PopoverProps} from './base-popover';
import * as React from 'react';

export type withChildren = {
	children?: any;
};

export const PrimaryPopover = (props: PopoverProps & withChildren) => {
	return <BasePopover {...props} popoverType='primary'>{props.children}</BasePopover>;
};

export const Popover = PrimaryPopover;

export const SecondaryPopover = (props: PopoverProps & withChildren) => {
	return <BasePopover {...props} popoverType='secondary'>{props.children}</BasePopover>;
};

const DarkPopover = (props: PopoverProps & withChildren) => {
	return <BasePopover {...props} popoverType='dark'>{props.children}</BasePopover>;
};

export const CallDevicePopover = DarkPopover;
