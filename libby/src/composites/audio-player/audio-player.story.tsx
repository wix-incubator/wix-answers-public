import {Container} from '../../primitives/container/container';
import * as React from 'react';
import { Column } from '../../common/story-utils';
import { AudioPlayer } from './audio-player.comp';

export class StoryOfAudioPlayer extends React.Component<any, any> {
	render () {
		// tslint:disable-next-line:max-line-length
		const recordingUrl = 'http://www.mfiles.co.uk/mp3-downloads/frederic-chopin-piano-sonata-2-op35-3-funeral-march.mp3';

		return (
			<span className='row'>
				<Column>
					<Container>
						<div style={{width: '35vw'}}><AudioPlayer audioUrl={recordingUrl}/></div>
					</Container>
				</Column>
			</span>
		);
	}
}
