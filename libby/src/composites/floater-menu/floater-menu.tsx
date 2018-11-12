import * as React from 'react';
import { BaseProps, namespacedClassnames } from '../../common';
import { Tooltip } from '../../primitives/tooltip/tooltip';
import { Icon } from '../../primitives';

export type FloaterMenuProps = BaseProps;

export const floaterMenuKey = 'floater-menu';
export const FloaterMenu = (props: FloaterMenuProps) => {

	const classNames = namespacedClassnames(floaterMenuKey, props.className);
	return <div className={classNames}>{props.children}</div>;
};

export type MenuItemType = 'normal' | 'danger';

export type MenuItemProps = {
	onSelect?: () => void;
	disabled?: boolean | string;
	type?: MenuItemType;
	value?: string;
	icon?: string;
} & BaseProps;

export const MenuItem = (props: MenuItemProps) => {
	const className = namespacedClassnames('menu-item', {
		disabled: props.disabled,
		icon: props.icon
	}, props.type, props.className);
	const onClick = !props.disabled ? props.onSelect : undefined;
	const menuItem = (
		<div
			className={className}
			data-value={props.value}
			onClick={onClick}
		>
			{props.icon && <Icon icon={props.icon} />}
			{props.children}
		</div>
	);

	const disabledText = typeof props.disabled === 'string' ? props.disabled : '';

	return disabledText ? (
		<Tooltip body={disabledText} direction='left' relativeToBody={true}>
			{menuItem}
		</Tooltip>
	) : menuItem;
};

export const MenuItemDivider = () => {
	const className = namespacedClassnames('menu-item-divider');
	return <div className={className} />;
};
export const MenuItemHeading = (props: any) => {
	const className = namespacedClassnames('menu-item-heading', props.className || '');
	return <div className={className}>{props.children}</div>;
};
export const MenuItemSubheading = (props: any) => {
	const className = namespacedClassnames('menu-item-subheading', props.className || '');
	return <div className={className}>{props.children}</div>;
};

export const MenuItemSubtitle = (props: any) => {
	const className = namespacedClassnames('menu-item-subtitle', props.className || '');
	return <div className={className}><span>{props.children}</span></div>;
};
