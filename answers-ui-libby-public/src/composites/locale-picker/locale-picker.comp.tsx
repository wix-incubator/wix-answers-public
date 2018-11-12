import { iconsMap } from '../../icons/processed';
import { Icon } from '../../primitives/icon/icon';
import { LinkButton } from '../../primitives/buttons';
import { Popover } from '../../primitives/popover/popover';
import { FloaterMenu, MenuItem } from '..';
import * as React from 'react';
import { namespacedClassnames, ValueCompProps } from '../../common';

export type Locale = string;

export type LocalePickerProps = ValueCompProps<Locale, {
	locales: string[];
	t: (key: string) => string;
	compact?: boolean;
	selectedT?: (key: string) => string;
}>;

export type LocalePickerState = {
	isLocaleMenuOpen: boolean
};

const key = 'locale-picker';

export class LocalePicker extends React.PureComponent<LocalePickerProps, LocalePickerState> {

	state: LocalePickerState = {
		isLocaleMenuOpen: false
	};

	selectLocale = (value: Locale) => () => {
		this.props.onChange(value);
		this.closeLocaleMenu();
	}

	closeLocaleMenu = () => {
		this.setState({ isLocaleMenuOpen: false });
	}

	toggleLocaleMenu = () => {
		this.setState({ isLocaleMenuOpen: !this.state.isLocaleMenuOpen });
	}

	render () {
		const className = namespacedClassnames(key);
		const {props} = this;

		const localeMenuItems = props.locales.map((locale: Locale) => {
			return (
				<MenuItem
					className={namespacedClassnames(`locale-item`)}
					value={locale}
					key={locale}
					onSelect={this.selectLocale(locale)}
				>
					{props.t(locale)}
				</MenuItem>
			);
		});

		const localeMenu = (
			<div className={namespacedClassnames('locale-menu-wrapper')}>
				<FloaterMenu>
					{localeMenuItems}
				</FloaterMenu>
			</div>
		);

		return (

			<div className={className}>
				<Popover body={localeMenu} isOpen={this.state.isLocaleMenuOpen} onOuterAction={this.closeLocaleMenu}>
					<div className={namespacedClassnames('picked-locale-wrapper')}>
						{props.compact ? <Icon className='globus-icon' icon={iconsMap.globus} /> : null}
						<LinkButton onClick={this.toggleLocaleMenu}>
							<span
								className={namespacedClassnames('picked-locale', {compact: props.compact})}
								data-value={props.value}
							>{props.selectedT ? props.selectedT(props.value) : props.t(props.value)}
							</span>
							<Icon className='dd-icon' icon={iconsMap.buttonDd} />
						</LinkButton>
					</div>
				</Popover>
			</div>
		);
	}
}
