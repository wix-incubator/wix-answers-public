import { BaseProps, isPromise } from '../../../common';
import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { ButtonState } from '../base-button/base-button.comp';
import { Tooltip } from '../..';

export type LinkButtonProps = {
	onClick: (e?: any) => (void | Promise<any>);
	disabled?: boolean | string;
	type?: 'normal' | 'danger'
} & BaseProps;

export class LinkButton extends React.PureComponent<LinkButtonProps, {}> {

	unMounted: boolean = false;

	state: ButtonState = {
		loading: false
	};

	componentWillUnmount () {
		this.unMounted = true;
	}

	startLoading = () => {
		if (!this.unMounted) {
			this.setState({loading: true});
		}
	}

	stopLoading = () => {
		if (!this.unMounted) {
			this.setState({loading: false});
		}
	}

	onClick = (e: any) => {
		const result = this.props.onClick(e);
		if (result && isPromise(result)) {
			this.startLoading();
			result.then(this.stopLoading, this.stopLoading);
		}
	}

	render () {
		const props = this.props;
		const {loading} = this.state;
		const disabled = props.disabled || loading;
		const classNames = namespacedClassnames('link-button', {disabled}, props.type, props.className);

		const disabledMsg = (typeof disabled === 'string') ? disabled : '';

		const buttonComp = (
			<button onClick={this.onClick} disabled={!!disabled} className={classNames}>{props.children}</button>
		);

		return !!disabledMsg ? (
			<Tooltip body={disabledMsg} relativeToBody={true}>
				{buttonComp}
			</Tooltip>
		) : buttonComp;
	}
}

export const DangerLinkButton = (props: LinkButtonProps) => {
	return <LinkButton {...props} type='danger'>{props.children}</LinkButton>;
};
