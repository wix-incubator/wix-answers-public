import * as React from 'react';
import { Column } from '../../common/story-utils';
import { AudioUploader } from './audio-uploader.comp';

class FileUploader {

	static fileUploadUrl = `/api/v1/files`; // for some very weird reason importing this stopped working. wanted

	static supportedFileTypes = ['.mp3', '.wav', '.wmp', '.wma'];

	static uploadLimitInBytes = 25 * 1024 * 1024;

	// tslint:disable-next-line:max-line-length
	static uploadFileWithProgress (file: File, progressCallback?: (precentage: number) => void, secured: boolean = true): Promise<string> {
		const xhr = new XMLHttpRequest();
		const data = new FormData();
		data.append('file', file);
		data.append('secured', `${secured}`);

		return new Promise((resolve, reject) => {
			xhr.onload = () => {
				const resData = xhr.responseText;
				try {
					resolve(JSON.parse(resData));
				} catch (e) {
					reject(e);
				}
			};
			xhr.onerror = () => {
				try {
					reject(JSON.parse(xhr.responseText));
				} catch (e) {
					reject(e);
				}
			};

			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const percent = Math.round((event.loaded / event.total) * 100);
					if (progressCallback) {
						progressCallback(percent);
					}
				}
			};
			xhr.open('POST', FileUploader.fileUploadUrl);
			xhr.send(data);
		})
		.then((resData: any) => resData.filelink);
	}
}

// tslint:disable-next-line:max-classes-per-file
export class StoryOfAudioUploader extends React.Component<any, any> {
	state = {
		audioUrl: '',
		name: ''
	};

	onAudioFileChange = (url: string, name: string) => this.setState({audioUrl: url, name});

	render () {
		const audioUrl = this.state.audioUrl;
		const props = {
			audioUrl,
			audioTitle: this.state.name,
			translateFn: (key: string, params?: any) => {
				if (key === 'common.audio-uploader.upload-file') {
					return 'Upload an audio file';
				} else if (key === 'common.audio-uploader.replace') {
					return 'Replace';
				} else if (key === 'common.audio-uploader.retry') {
					return 'Retry';
				} else if (key === 'common.cancel') {
					return 'Cancel';
				} else if (key === 'common.audio-uploader.error-size') {
					return `File '${params.name}' exceeds file size limit.`;
				} else {
					return key;
				}
			},
			fileUploader: FileUploader,
			onAudioFileChange: this.onAudioFileChange
		};

		return (
			<span className='row'>
				<Column>
					<div style={{width: '40vw'}}>
						<AudioUploader {...props}/>
					</div>
				</Column>
			</span>
		);
	}
}
