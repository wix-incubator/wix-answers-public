import * as React from 'react';
import { ImageUploader } from './image-uploader.comp';

export class StoryOfImageUploader extends React.PureComponent<{}, {}> {
	state = {
		url: 'http://lorempixel.com/100/100/people/?ck=7933'
	};

	onChange = (url: string) => this.setState({url});

	render () {
		const t = () => 'Invalid HEX color';
		const url = 'http://lorempixel.com/100/100/people/?ck=7933';
		const fileUploader = {
			uploadFile: () => Promise.resolve({} as any),
			uploadImageFromUrl: () => Promise.resolve({} as any),
			supportedFileTypes: [''],
			uploadLimitInBytes: 5000
		};

		return (
			<div style={{width: '334px'}}>
				<ImageUploader
					size={{height: 118, width: 334}}
					url={url}
					onChange={this.onChange}
					t={t}
					fileUploader={fileUploader}
				/>
			</div>
		);
	}
}
