import * as ReactDom from 'react-dom';
import * as React from 'react';
import { AvatarUser, AvatarGroup } from '../common';
import {UserAvatar, UserAvatarProps} from './user-avatar/user-avatar';
import {GroupAvatar, GroupAvatarProps} from './group-avatar/group-avatar';
import {AvatarSizes} from './base-avatar/base-avatar';

// tslint:disable-next-line:max-line-length
export const renderUserAvatarAndReturnUnmount = (elem: HTMLElement, user: AvatarUser, size: AvatarSizes, isAgent?: boolean) => {
	const compProps: UserAvatarProps = {user, size, isAgent};
	ReactDom.render(React.createElement(UserAvatar, compProps) as any,  elem);
	return () => {
		ReactDom.unmountComponentAtNode(elem);
	};
};

export const renderGroupAvatarAndReturnUnmount = (elem: HTMLElement, group: AvatarGroup, size: AvatarSizes) => {
	const compProps: GroupAvatarProps = {group, size};
	ReactDom.render(React.createElement(GroupAvatar, compProps) as any,  elem);
	return () => {
		ReactDom.unmountComponentAtNode(elem);
	};
};
