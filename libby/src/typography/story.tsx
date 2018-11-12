import * as React from 'react';
import { typographyTypes, TypographyConfig, Text, TypographyType } from '.';

const types = Object.keys(typographyTypes) as TypographyType[];

const Preview: React.SFC<{type: TypographyType}> = ({type}) => {
	const config = typographyTypes[type] as TypographyConfig;
	// tslint:disable-next-line:max-line-length

	const style = {
		padding: '15px 0'
	};

	// tslint:disable-next-line:max-line-length
	return <div style={style}><Text type={type}>{`${type.toUpperCase()} - Size ${config.size}, Color - ${config.color}, weight: ${config.weight}`}</Text></div>;
};

export const TypographyStory = () => {
	return (
		<div className='story-container'>
			<h2 className='h2-title'>Typography</h2>
			{types.map((type) => <Preview type={type} key={type}/>)}
		</div>
	);
};
