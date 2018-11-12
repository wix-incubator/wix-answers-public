import {Container} from '../../primitives/container/container';
import * as React from 'react';
import { Column } from '../../common/story-utils';
import { SimpleAudioPlayer } from './simple-audio-player.comp';

export class StoryOfSimpleAudioPlayer extends React.Component<any, any> {
	render () {
		// tslint:disable-next-line:max-line-length
		const recordingUrl = 'http://www.mfiles.co.uk/mp3-downloads/frederic-chopin-piano-sonata-2-op35-3-funeral-march.mp3';

		return (
			<span className='row'>
				<Column title='With Title'>
					<Container>
						<div style={{width: '30vw'}}><SimpleAudioPlayer audioUrl={recordingUrl} title='BHMessage.mp3'/></div>
					</Container>
				</Column>
			</span>
		);
	}
}
