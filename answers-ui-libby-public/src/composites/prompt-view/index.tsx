import * as React from 'react';
import { Text, Button, HollowButton } from '../..';
import { ValidatedValueComp } from '../../todo-move-to-lib';
import { namespacedClassnames } from '../../common/namespace-classes';
import { FormInput, OptionalFormInputProps } from '../form-input/form-input.comp';

export const promptViewKey = 'prompt-view';

export type PromptViewProps<T, M = {}, V = string> = {
	// in
	title: string;
	confirmText: string;
	cancelText?: string;
	onConfirm: (value: T) => void;
	onCancel: () => void;
	className?: string;
	initialValue: T;
	validator?: (value: T) => V | true;
	additionalProps: M;
};

export type PromptViewState<T, V = string> = {
	value: T;
	validationError?: V;
};

// tslint:disable-next-line:max-line-length
export const promptViewCreator = <T, M = {}, V = string>(Comp: ValidatedValueComp<T, M, V>): React.ComponentClass<PromptViewProps<T, M, V>> => {
	return class extends React.PureComponent<PromptViewProps<T, M, V>, PromptViewState<T, V>> {

		state: PromptViewState<T, V> = {
			value: this.props.initialValue
		};

		// tp: TranslateFn = (key, params) => {
		// 	return this.props.t(`${translationPrefix}.${key}`, params);
		// }

		changeValue = (value: T) => this.setState({value, validationError: undefined});

		onEnter = () => {
			const {onConfirm, validator} = this.props;
			const {value} = this.state;
			if (validator) {
				const validationError = validator(value);
				if (validationError !== true) {
					this.setState({validationError});
					return;
				}
			}
			onConfirm(value);
		}

		render () {
			const {props, state} = this;

			return (
				<div className={namespacedClassnames(promptViewKey, props.className, {unvalidated: !props.validator})}>
					<header><Text className='title' type='h2'>{props.title}</Text></header>
					<main>
					<Comp
						className='value'
						value={state.value}
						onChange={this.changeValue}
						validationError={state.validationError}
						{...props.additionalProps}
					/>
					</main>
					<footer>
						<HollowButton
							className='cancel'
							onClick={this.props.onCancel}
						>
							{props.cancelText}
						</HollowButton>
						<Button className='enter' onClick={this.onEnter}>{props.confirmText}</Button>
					</footer>
				</div>
			);
		}
	};

};

export const PromptView = promptViewCreator<string, OptionalFormInputProps>(FormInput);
