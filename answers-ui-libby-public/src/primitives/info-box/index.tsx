import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import { LinkButton } from '../buttons/link-button/link-button';

export const InfoBoxKey = 'info-box';

export interface InfoBoxProps extends BaseProps {
	title?: string | JSX.Element;
	mainBody: JSX.Element;
	additionalBody?: JSX.Element;
	showMoreText: string;
	showLessText: string;
}

export type InfoBoxState = {
	expanded: boolean
};

export class InfoBox extends React.PureComponent<InfoBoxProps, InfoBoxState> {

	state: InfoBoxState = {
		expanded: false
	};

	toggleExpand = () => this.setState({expanded: !this.state.expanded});

	render () {
		const {props, state} = this;
		const hasTitle = !!props.title;
		const classNames = namespacedClassnames(InfoBoxKey, props.className, {
			'has-title': hasTitle
		});

		const toggleExpandText = state.expanded ? props.showLessText : props.showMoreText;

		const maybeExpandBtn = props.additionalBody ? (
		<LinkButton className='toggle-expand' onClick={this.toggleExpand}>
		{toggleExpandText}</LinkButton>) : null;

		return (
			<div className={classNames}>
				{hasTitle ? <div className='title-container'>{props.title}</div> : null}
				<div className='body-container'>
				{props.mainBody}
				{state.expanded ? props.additionalBody : null}
				{maybeExpandBtn}
				</div>
			</div>
		);
	}
}
