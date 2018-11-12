import {namespacedClassnames} from '../../common/namespace-classes';
import {LinkButton} from '../../primitives/buttons/link-button/link-button';
import * as React from 'react';
import { SimpleAudioPlayer } from '../simple-audio-player/simple-audio-player.comp';
import { ErrorXIcon } from './error-x';

const fileSizeToString = (size: number) => {
	if (size < 1024) {
		return `${size}B`;
	} else if (size < 1024 * 1024) {
		return `${(size / 1024).toFixed(1)}KB`;
	} else {
		return `${(size / (1024 * 1024)).toFixed(1)}MB`;
	}
};

export type AudioUploaderProps = {
	audioUrl?: string;
	audioTitle?: string;
	translateFn: (key: string, params?: {[k: string]: string}) => string;
	onAudioFileChange: (url: string, name: string) => void;
	fileUploader: {
		uploadLimitInBytes: number,
		uploadFileWithProgress: any,
		supportedFileTypes: string[]
	}
};

export type AudioUploaderState = {
	isUploading: boolean;
	progressPercentage: number;
	fileSize: number;
	fileName: string;
	errorMessage: string;
};

export class AudioUploader extends React.Component<AudioUploaderProps, AudioUploaderState> {
	fileInput: HTMLInputElement | null = null;

	state: AudioUploaderState = {
		isUploading: false,
		progressPercentage: 0,
		fileSize: 0,
		fileName: '',
		errorMessage: ''
	};

	clearProgress = () => this.setState({isUploading: false, progressPercentage: 0, fileSize: 0, fileName: ''});

	updateProgress = (progressPercentage: number) => {
		this.setState({progressPercentage});
	}

	insertFile = (event: any) => {
		const file: File = event.target.files[0];
		const size = file.size;
		const isSizeOK = size < this.props.fileUploader.uploadLimitInBytes;
		const translate = this.props.translateFn;
		this.setState({isUploading: true, fileSize: size, fileName: file.name});

		if (isSizeOK) {
			this.setState({errorMessage: ''});
			this.props.fileUploader.uploadFileWithProgress(file, this.updateProgress)
			.then((fileUrl: string) => {
				if (!this.state.isUploading) {
					return;
				}

				const isAudio = file.type.indexOf('audio') !== -1;

				if (isAudio) {
					this.props.onAudioFileChange(fileUrl, file.name);
					this.clearProgress();
				} else {
					this.setState({errorMessage: translate('common.audio-uploader.error-type', {name: file.name})});
				}
			}, () => {
				this.setState({errorMessage: translate('common.audio-uploader.error-general')});
			});
		} else {
			this.setState({errorMessage: translate('common.audio-uploader.error-size', {name: file.name})});
		}
	}

	handleFileDrop = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'drop') {
			this.insertFile({target: {
				files: e.dataTransfer.files
			}});
		}
	}

	openFileInput = (e?: any) => {
		if (e) {
			e.stopPropagation();
		}
		if (this.fileInput) {
			this.fileInput.click();
		}
	}

	cancelUpload = () => this.clearProgress();

	retryUpload = () => {
		if (this.fileInput) {
			this.fileInput.value = '';
		}
		this.openFileInput();
		this.setState({errorMessage: ''});
		this.clearProgress();
	}

	renderAudioPlayer = () => (
		<div className='uploader-container'>
			<SimpleAudioPlayer audioUrl={this.props.audioUrl || ''} title={this.props.audioTitle || ' '}/>
			<div className='action-button-container'>
				<span className='action-button'>
					<LinkButton onClick={this.openFileInput}>{this.props.translateFn('common.audio-uploader.replace')}</LinkButton>
				</span>
			</div>
		</div>
	)

	renderUploadProgress = () => {
		const offset = this.state.progressPercentage * 62.832 / 100;
		return (
			<div className='uploader-container'>
				<div className='progress-icon'>
					<svg className='progress-icon-svg' viewBox='0 0 47 47'>
						<circle id='outer' cx='23.5' cy='23.5' r='22.5'/>
						<circle id='inner' cx='23.5' cy='23.5' r='10' strokeWidth='20' strokeDasharray='62.83' strokeDashoffset={offset}/>
					</svg>
				</div>
				<div className='text-wrapper'>
					<div className='file-name-wrapper'>
						<div className='file-name'>{this.state.fileName}</div>
						<div className='file-size'>{`(${fileSizeToString(this.state.fileSize)})`}</div>
					</div>
					<div className='uploading'>{this.props.translateFn('common.audio-uploader.uploading')}</div>
				</div>
				<div className='action-button-container'>
					<span className='action-button'>
						<LinkButton onClick={this.cancelUpload}>{this.props.translateFn('common.cancel')}</LinkButton>
					</span>
				</div>
			</div>
		);
	}

	renderErrorMessage = () => (
		<div className='uploader-container'>
			<div className='error-icon'>
				<ErrorXIcon/>
			</div>
			<div className='text-wrapper'>
				<div className='file-name-wrapper'>
					<div className='file-name'>{this.state.fileName}</div>
					<div className='file-size'>{`(${fileSizeToString(this.state.fileSize)})`}</div>
				</div>
				<div className='error-message'>{this.state.errorMessage}</div>
			</div>
			<div className='action-button-container'>
				<span className='action-button'>
					<LinkButton onClick={this.retryUpload}>{this.props.translateFn('common.audio-uploader.retry')}</LinkButton>
				</span>
			</div>
		</div>
	)

	renderEmptyState = () => (
		<div
			className='uploader-container empty-state'
			onDragOver={this.handleFileDrop}
			onDrop={this.handleFileDrop}
			onClick={this.openFileInput}
		>
			<LinkButton onClick={this.openFileInput}>{this.props.translateFn('common.audio-uploader.upload-file')}</LinkButton>
		</div>
	)

	render () {
		const key = 'audio-uploader';
		const classNames = namespacedClassnames(key);
		const isUploading = this.state.isUploading;
		const error = !!this.state.errorMessage;
		const url = this.props.audioUrl;
		return (
			<div className={classNames}>
				<input
					type='file'
					ref={(input) => { this.fileInput = input; }}
					multiple={false}
					accept={this.props.fileUploader.supportedFileTypes.join(',')}
					style={{display: 'none'}}
					onChange={this.insertFile}
				/>
				{isUploading && (error ? this.renderErrorMessage() : this.renderUploadProgress())}
				{!isUploading && (url ? this.renderAudioPlayer() : this.renderEmptyState())}
			</div>
		);
	}
}
