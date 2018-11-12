import {namespacedClassnames, BaseProps, isPromise} from '../../../common';
import * as React from 'react';
import { TinyLoader, Tooltip } from '../..';

export type ButtonType = 'default' | 'positive' | 'attention' | 'danger' | 'special' | 'premium';

export type ButtonSize = 'small' | 'normal' | 'large' | 'extra-large';

export type ButtonClickHandler = (e?: any) => (void | Promise<any>);

export type ButtonProps = {
	onClick: ButtonClickHandler;
	disabled?: boolean | string;
	buttonType?: ButtonType;
	isHollow?: boolean;
	size?: ButtonSize;
} & BaseProps;

const defaultProps = {
	disabled: false,
	buttonType: 'default',
	size: 'normal'
};

export type ButtonState = {
	loading: boolean,
	width?: number
};

export class BaseButton extends React.PureComponent<ButtonProps, ButtonState> {

	elemRef: HTMLElement | null = null;
	unMounted: boolean = false;

	state: ButtonState = {
		loading: false
	};

	componentWillUnmount () {
		this.unMounted = true;
	}

	startLoading = () => {
		const elem = this.elemRef;
		if (elem && !this.unMounted) {
			this.setState({loading: true, width: elem.offsetWidth});
		}
	}

	stopLoading = () => {
		const elem = this.elemRef;
		if (elem && !this.unMounted) {
			this.setState({loading: false, width: undefined});
		}
	}

	setRef = (ref: any) =>  this.elemRef = ref;

	onClick = (e: any) => {
		const result = this.props.onClick(e);
		if (result && isPromise(result)) {
			this.startLoading();
			result.then(this.stopLoading, this.stopLoading);
		}
	}

	render () {
		const props = {...defaultProps, ...this.props};
		const {loading, width} = this.state;

		const {size, buttonType, className} = props;
		const hollow = props.isHollow;
		const disabled = props.disabled || loading;

		const classNames = namespacedClassnames('button', buttonType, size, className, {disabled, hollow, loading});
		const content = loading ? <TinyLoader/> : props.children;
		const maybeStyle = loading ? {width} : {};
		const disabledMsg = (typeof disabled === 'string') ? disabled : '';

		const buttonComp = (
			<button style={maybeStyle} onClick={this.onClick} ref={this.setRef} disabled={!!disabled} className={classNames}>
				{content}
			</button>
		);

		return !!disabledMsg ? (
			<Tooltip body={disabledMsg} relativeToBody={true}>
				{buttonComp}
			</Tooltip>
		) : buttonComp;
	}
}
