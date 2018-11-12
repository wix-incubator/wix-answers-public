import * as React from 'react';
import { LocalePicker } from './locale-picker.comp';
import { Column } from '../../common';
import { style } from 'typestyle/lib';

const langsMap = {
	en: 'English',
	pt: 'Port',
	es: 'Espanhol',
	fr: 'French',
	kl: 'Klingon'
};

const translate = (key: string) => {
	const keys = {
		en: 'English',
		pt: 'Port',
		es: 'Espanhol',
		fr: 'French',
		kl: 'Klingon'
	} as any;
	return keys[key];
};

const translateCompact = (key: string) => {
	const keys = {
		en: 'EN',
		pt: 'PT',
		es: 'ES',
		fr: 'FR',
		kl: 'KL'
	} as any;
	return keys[key];
};

export class StoryOfLocalePicker extends React.Component<any, any> {
	state = {
		value: 'kl'
	};

	locales = Object.keys(langsMap);

	onLocalePick = (value: string) => {
		this.setState({ value });
	}

	render () {
		return (
			<div className='row'>
				<Column title='Default' {...style}>
						<LocalePicker
							locales={this.locales}
							t={translate}
							value={this.state.value}
							onChange={this.onLocalePick}
						/>
				</Column>
				<Column title='Compact' {...style}>
						<LocalePicker
							locales={this.locales}
							t={translateCompact}
							value={this.state.value}
							onChange={this.onLocalePick}
							compact={true}
						/>
				</Column>
				<Column title='Compact with custom selected locale translate' {...style}>
						<LocalePicker
							locales={this.locales}
							t={translate}
							value={this.state.value}
							onChange={this.onLocalePick}
							compact={true}
							selectedT={translateCompact}
						/>
				</Column>
			</div>
		);
	}
}
