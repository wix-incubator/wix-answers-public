import * as React from 'react';
import { InfoBox } from '.';

export class InfoBoxStory extends React.Component<any, any> {
	render () {
		return (
			<div>
					<h3>Info box</h3>
					<InfoBox
						mainBody={<div>Bob!</div>}
						additionalBody={<div>More bobs!</div>}
						title='Bob Info'
						showMoreText='Show more'
						showLessText='Show less'
					/>
			</div>
		);
	}
}
