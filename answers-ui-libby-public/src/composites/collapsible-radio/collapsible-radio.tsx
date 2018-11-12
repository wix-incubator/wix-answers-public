import {RadioButton, RadioValue} from '../../primitives/radio-group/radio-group';
import {namespacedClassnames} from '../../common';
import * as React from 'react';
import * as propTypes from 'prop-types';
import { HeightAnimation } from '../../animations/height/height';
import { Text } from '../..';

export type CollapsbileRadioButtonProps = {
	title: string;
	value: RadioValue;
	description?: string | JSX.Element;
	disabled?: boolean;
	children?: any;
};

export class CollapsibleRadio extends React.Component<CollapsbileRadioButtonProps, any> {
	static contextTypes = {
		radioGroup: propTypes.object
	};

	render () {
		const props = this.props;
		const hasDescription = !!props.description;
		const disabled = !!props.disabled;
		const {selectedValue, onChange} = this.context.radioGroup;
		const checked = props.value === selectedValue;
		const hasChildren = React.Children.toArray(this.props.children).length;
		const classNames = namespacedClassnames('collapsible-radio',
			{checked, disabled, 'has-description': hasDescription, 'no-children': !hasChildren}
		);

		const onClick = () => {
			if (!checked && !props.disabled) {
				onChange(props.value);
			}
		};

		const collapsibleBody = hasChildren ? (
			<div className='collapsible-body'>
					<HeightAnimation show={checked}>
						<div className='body-wrapper'>{props.children}</div>
					</HeightAnimation>
				</div>
		) : null;

		return (
			<div className={classNames} data-value={props.value}>
				<div className='collapsible-header' onClick={onClick}>
					<RadioButton value={props.value} disabled={props.disabled}>
						<span className='header-text'>
							<Text className='header-title' type='h2a'>{props.title}</Text>
							{props.description ? <Text className='header-description' type='t1a'>{props.description}</Text> : null}
						</span>
					</RadioButton>
				</div>
				{collapsibleBody}
			</div>
		);
	}
}
