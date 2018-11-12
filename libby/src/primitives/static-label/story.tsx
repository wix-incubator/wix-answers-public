import * as React from 'react';
import { StaticLabel, StaticLabelType, StaticLabelSize } from '.';

export class StoryOfStaticLabel extends React.Component<any, any> {
	render () {
		return (
			<span className='row'>
				<div className='column'>
					<StaticLabel
						name={'Liat Vanir'}
						type={StaticLabelType.NEUTRAL}
						size={StaticLabelSize.SMALL}
					/>
				</div>
				<div className='column'>
					<StaticLabel
						name={'ME'}
						type={StaticLabelType.INFO}
						size={StaticLabelSize.SMALL}
					/>
				</div>
				<div className='column'>
					<StaticLabel
						name={'ShoutOut Compliance'}
						type={StaticLabelType.NEUTRALICON}
						size={StaticLabelSize.SMALL}
					/>
				</div>
			</span>
		);
	}
}
