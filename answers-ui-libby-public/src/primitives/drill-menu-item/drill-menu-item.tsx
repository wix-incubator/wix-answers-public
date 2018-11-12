import * as React from 'react';
import { Icon } from '../icon/icon';
import { iconsMap } from '../../icons/processed';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';

export type DrillMenuItemProps = {
	onClick: () => void;
	disabled?: boolean;
} & BaseProps;

export class DrillMenuItem extends React.PureComponent<DrillMenuItemProps, any> {

	onClick = () => {
		if (!this.props.disabled) {
			this.props.onClick();
		}
	}

	render () {
		const {props} = this;
		const classNames = namespacedClassnames('drill-menu-item', {disabled: props.disabled}, props.className);

		return (
			<div className={classNames} onClick={this.onClick}>
				<div className='content'>
					{props.children}
				</div>
				<Icon icon={iconsMap.arrowRight} className='arrow-icon'/>
			</div>
		);
	}
}
