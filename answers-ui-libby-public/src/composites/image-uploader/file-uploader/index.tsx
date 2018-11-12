import * as React from 'react';
import { Icon, Text, LinkButton } from '../../..';
import { iconsMap } from '../../../icons';
import * as classNames from 'classnames';
import { FileUploadResponse, FileUploadError } from '../../../common';

export const fileUploaderKey = 'file-uploader';

export type ProgressCallback = (progress: ProgressEvent) => void;

export type UploadFromUrlWithProgress = (urlDto: {url: string}, cb?: ProgressCallback) => Promise<FileUploadResponse>;

export type UploadFromUrl = (urlDto: {url: string}) => Promise<FileUploadResponse>;

export type FileUploaderApi = {
	uploadLimitInBytes: number,
	supportedFileTypes: string[],
	uploadFile: (fileDto: {file: File}, cb?: ProgressCallback) => Promise<FileUploadResponse>,
	uploadImageFromUrl: UploadFromUrl | UploadFromUrlWithProgress;
};

const isWithProgress = (uploadFunction: UploadFromUrl | UploadFromUrlWithProgress) => uploadFunction.length === 2;

export type FileUploaderProps = {
	fileToUpload: File | string;
	fileUploader: FileUploaderApi;
	size?: {height?: 'short', width?: 'narrow' | 'xnarrow'};
	t: (key: string, params?: any) => string;
	onClickTryAgain?: () => void;
	onError: () => void;
	onChange: (url: string) => void;
};

export type FileUploaderState = {
	uploadPercentage: number;
	fileName: string;
	uploadError: 'max-size' | 'file-type' | 'unexpected-error' | '';
};

export class FileUploader extends React.PureComponent<FileUploaderProps, FileUploaderState> {
	state: FileUploaderState = {
		uploadPercentage: 0,
		fileName: '',
		uploadError: ''
	};

	tp = (key: string, params?: any) => this.props.t(`common.image-uploader.${key}`, params);

	componentDidMount () {
		const {fileToUpload} = this.props;
		if (typeof fileToUpload === 'string') {
			this.handleUploadByUrl(fileToUpload);
		} else {
			this.onFileSelect(fileToUpload);
		}
	}

	onFileSelect = (file: File) => {
		this.setState({fileName: file.name});
		this.props.fileUploader.uploadFile({file}, this.progressListener).then(this.handleUploadSuccess)
		.catch(this.handleUploadError);
	}

	handleUploadByUrl = (imageUrl: string) => {
		const {uploadImageFromUrl} = this.props.fileUploader;
		if (isWithProgress(uploadImageFromUrl)) {
			const uploadWithProgress = uploadImageFromUrl as UploadFromUrlWithProgress;
			uploadWithProgress({url: imageUrl}, this.progressListener)
			.then(this.handleUploadSuccess);
		} else {
			const dummyProgress = () => {
				const magicNumber = 10;
				const percent = this.state.uploadPercentage;
				this.setState({uploadPercentage: Math.round(percent + magicNumber * (1 - percent / 100))});
			};
			const intervalLength = 100;
			const interval = setInterval(dummyProgress, intervalLength);
			uploadImageFromUrl({url: imageUrl})
			.then((res) => {
				clearInterval(interval);
				this.handleUploadSuccess(res);
			})
			.catch((e) => {
				clearInterval(interval);
				this.handleUploadError(e);
			});
		}
	}

	progressListener = (progress: ProgressEvent) => {
		const uploadPercentage = progress.total ? Math.round((progress.loaded / progress.total) * 100) : 0;
		this.setState({uploadPercentage});
	}

	handleUploadSuccess = (res: FileUploadResponse) => {
		const uploadError = res.fileSizeBytes > this.props.fileUploader.uploadLimitInBytes ? 'max-size'
			: this.props.fileUploader.supportedFileTypes.indexOf(`.${res.extension}`) === -1 ? 'file-type' : '';
		if (uploadError) {
			this.setState({uploadError, uploadPercentage: 0, fileName: ''});
		} else {
			this.props.onChange(res.filelink);
		}
	}

	handleUploadError = (e: any) => {
		const errorCode = (e.response && e.response.data) ? e.response.data.errorCode : null;
		const uploadError = errorCode === FileUploadError.MAX_FILE_SIZE_EXCEEDED ? 'max-size' :
			errorCode === FileUploadError.INVALID_EXTENSION ? 'file-type' : 'unexpected-error';
		this.setState({uploadPercentage: 0, fileName: '', uploadError});
		this.props.onError();
	}

	renderErrorState = () => {
		const props = this.props;
		const maxSizeInMB = Math.round(this.props.fileUploader.uploadLimitInBytes / Math.pow(10, 6));
		const errorDescriptionText = this.tp(`error.${this.state.uploadError}.description`,
			{supportedTypes: this.props.fileUploader.supportedFileTypes.join(', '), maxSize: maxSizeInMB});
		return (
			<div className='error-state'>
				<div className='error-text-wrapper'>
					<div className='error-title'>{this.tp(`error.${this.state.uploadError}`)}</div>
					<div className='error-description'>{errorDescriptionText}</div>
				</div>
				{props.onClickTryAgain ? <LinkButton onClick={props.onClickTryAgain}>{this.tp('try-again')}</LinkButton> : null}
			</div>
		);
	}

	render () {
		const uploadingState = (
			<div className='uploading-state-container'>
				<div className='uploading-text-container'>
				<span className='filename-wrapper'><Text type='t1a'><Icon icon={iconsMap.image}/>{this.state.fileName}</Text></span>
				<div className='uploading-text-wrapper'>
					<span className='uploading-text'>{this.tp('uploading')}</span>
					<span className='progress-percentage'>{`${this.state.uploadPercentage}%`}</span>
				</div>
				</div>
				<div className='upload-progress-bar' style={{width: `${this.state.uploadPercentage}%`}}/>
			</div>
		);

		const {size} = this.props;
		const classnames = classNames(fileUploaderKey, {
			short: size && size.height === 'short',
			narrow: size && size.width === 'narrow',
			xnarrow: size && size.width === 'xnarrow'
		});
		return (
			<div className={classnames}>
				{this.state.uploadError ? this.renderErrorState() : uploadingState}
			</div>
		);
	}

}
