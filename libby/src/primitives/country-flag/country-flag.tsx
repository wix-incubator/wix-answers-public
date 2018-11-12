import * as React from 'react';
import { namespacedClassnames } from '../../common';

export type CountryFlagProps = {
	countryCode: string;
	name?: string;
};

const defaultSize = {
	w: 20,
	h: 15
};

const calcPos = (letter: string, size: number) => {
	return -(letter.toLowerCase().charCodeAt(0) - 97) * size;
};

export const CountryFlag = (props: CountryFlagProps) => {
	if (!props.countryCode || props.countryCode.length < 2) {
		return <i>N/A</i>;
	}

	const x = calcPos(props.countryCode[1], defaultSize.w);
	const y = calcPos(props.countryCode[0], defaultSize.h);

	const style = {
		backgroundPosition: `${x}px ${y}px`,
	};

	const maybeName = !!props.name ? (
		<span className='country-name'>{props.name}</span>
	) : null;

	return (
		<span className={namespacedClassnames('country-flag-container')}>
			<span className={`flag-icon ${props.countryCode}`} data-country={props.countryCode} style={style}/>
			{maybeName}
		</span>
	);
};
