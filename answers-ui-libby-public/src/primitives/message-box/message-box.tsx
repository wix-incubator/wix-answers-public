import { namespacedClassnames } from '../../common/namespace-classes';
import { Icon } from '../icon/icon';
import * as React from 'react';

export type MessageBoxType = 'warning' | 'attention' | 'info' | 'neutral';

type BaseMessageBoxProps = {
	type: MessageBoxType;
	embedded?: boolean;
	children?: any;
};

// tslint:disable-next-line:max-line-length
const messageBoxIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"><path fill="#FFF" d="M0 8.5a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0zm7.45 2.95c-.3.3-.45.6-.45 1.05 0 .45.15.75.45 1.05.3.3.6.45 1.05.45.45 0 .75-.15 1.05-.45.3-.3.45-.6.45-1.05 0-.45-.15-.75-.45-1.05-.3-.3-.6-.45-1.05-.45-.45 0-.75.15-1.05.45zm-.447-7.447L7.43 10h2l.428-5.997A.913.913 0 0 0 8.932 3H7.93a.917.917 0 0 0-.927 1.003z"/></svg>`;

class BaseMessageBox extends React.PureComponent<BaseMessageBoxProps> {
	render () {
		const isEmbedded = this.props.embedded ? 'is-embedded' : '';
		const classNames = namespacedClassnames('message-box', isEmbedded, this.props.type);

		return (
			<div className={classNames}>
				<Icon icon={messageBoxIcon}/>
				<div className='content'>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export type MessageBoxProps = {
	embedded?: boolean;
	children?: any;
};

export const WarningMessageBox = (props: MessageBoxProps) => {
	return <BaseMessageBox type='warning' embedded={props.embedded}>{props.children}</BaseMessageBox>;
};

export const AttentionMessageBox = (props: MessageBoxProps) => {
	return <BaseMessageBox type='attention' embedded={props.embedded}>{props.children}</BaseMessageBox>;
};

export const InfoMessageBox = (props: MessageBoxProps) => {
	return <BaseMessageBox type='info' embedded={props.embedded}>{props.children}</BaseMessageBox>;
};

export const NeutralMessageBox = (props: MessageBoxProps) => {
	return <BaseMessageBox type='neutral' embedded={props.embedded}>{props.children}</BaseMessageBox>;
};
