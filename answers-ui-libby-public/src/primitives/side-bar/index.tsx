import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';

export const SideBarKey = 'side-bar';

export type SideBarProps = {
	headerRenderer?: () => JSX.Element | null;
} & BaseProps;

export type SideBarState = {
	isScrolled: boolean;
};

export class SideBar extends React.PureComponent<SideBarProps, SideBarState> {
	state: SideBarState = {
		isScrolled: false
	};

	handleScroll = (e: any) => {
		const {state} = this;
		if (e.target.scrollTop > 0 && !state.isScrolled) {
			this.setState({isScrolled: true});
		} else if (e.target.scrollTop === 0 && state.isScrolled) {
			this.setState({isScrolled: false});
		}
	}

	render () {
		const {props, state} = this;
		const classNames = namespacedClassnames(SideBarKey, props.className, {scrolled: state.isScrolled});

		const maybeHeader = props.headerRenderer ? (
			<div className='side-bar-header'>
				{props.headerRenderer()}
			</div>
		) : null;

		return (
			<div className={classNames}>
				{maybeHeader}
				<div className='side-bar-body' onScroll={this.handleScroll}>
					{props.children}
				</div>
			</div>
		);
	}
}
