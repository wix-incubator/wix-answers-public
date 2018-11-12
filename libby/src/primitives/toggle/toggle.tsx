import {namespacedClassnames, isPromise} from '../../common';
import * as React from 'react';
import { normalToggleIcon, smallToggleIcon } from './toggle-icons';
import { Icon } from '..';

export type ToggleSizes = 'small' | 'normal';

export type ToggleProps = {
	onChange: (value: boolean) => (void | Promise<any>);
	disabled?: boolean;
	value: boolean;
	size?: ToggleSizes;
};

export type ToggleState = {
	loading: boolean,
	width?: number
};

export class Toggle extends React.PureComponent<ToggleProps, ToggleState> {

	elemRef: HTMLElement | null = null;
	unMounted: boolean = false;

	state: ToggleState = {
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

	toggle = () => {
		if (!this.props.disabled) {
			const result = this.props.onChange(!this.props.value);

			if (result && isPromise(result)) {
				this.startLoading();
				result.then(this.stopLoading, this.stopLoading);
			}
		}
	}

	render () {
		const props = this.props;
		const val = props.value;
		const size = props.size || 'normal';
		const classNames = namespacedClassnames('toggle', size, {
			on: val, off: !val, disabled: props.disabled || this.state.loading, loading: this.state.loading
		});
		const svg = (size === 'normal') ? normalToggleIcon : smallToggleIcon;

		return (
			<span className={classNames} onClick={this.toggle} ref={this.setRef}>
				<Icon icon={svg}/>
			</span>
		);
	}
}
