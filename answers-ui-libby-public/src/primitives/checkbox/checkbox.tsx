import {Icon} from '../icon/icon';
import {checkboxIconSvgData} from './checkbox-icon';
import { checkboxLargeIconSvgData} from './checkbox-large-icon';
import {namespacedClassnames} from '../../common/namespace-classes';
import * as React from 'react';
import { Tooltip } from '../tooltip/tooltip';
import { Text } from '../../typography';

export type CheckboxProps = {
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean | string;
	large?: boolean;
	children?: any;
	tooltipRelativeToBody?: boolean;
};

const deafaultProps = {
	disabled: false
};

export const checkboxKey = 'checkbox';

export class Checkbox extends React.PureComponent<CheckboxProps> {
	toggle = () => !this.props.disabled ? this.props.onChange(!this.props.value) : null;

	render () {
		const props = {...deafaultProps, ...this.props};
		const isCheckedClass = props.value === true ? 'checked' : '';
		const isDisabledClass = props.disabled ? 'disabled' : '';
		const isLargeClass = props.large ? 'large' : '';

		const classNames = namespacedClassnames(checkboxKey, isCheckedClass, isDisabledClass, isLargeClass);

		const checkIcon = (
			<span className='check-icon'>
				<Icon icon={props.large ? checkboxLargeIconSvgData : checkboxIconSvgData}/>
			</span>
		);

		const maybeDisabledCheckIcon = props.disabled && typeof props.disabled === 'string' ? (
			<Tooltip relativeToBody={true} body={props.disabled}>
				{checkIcon}
			</Tooltip>
		) : checkIcon;

		return (
			<label className={classNames}>
				{maybeDisabledCheckIcon}
				<input type='checkbox' checked={props.value} style={{display: 'none'}} onClick={this.toggle}/>
				<Text type='t1a' className='checkbox-body'>{props.children}</Text>
			</label>
		);
	}
}
