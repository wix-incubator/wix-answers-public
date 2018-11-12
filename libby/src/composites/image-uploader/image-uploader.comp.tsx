import * as React from 'react';
import * as classNames from 'classnames';
import { Popover, HollowButton, FloaterMenu, Icon, Input, Button } from '../..';
import { MenuItem } from '../floater-menu/floater-menu';
import { iconsMap } from '../../icons';
import { FileSelector } from '../../primitives/file-selector';
import { isUrl, namespacedClassnames } from '../../common';
import {Text} from '../../typography/text';
import { FileUploader, FileUploaderApi, FileUploaderProps } from './file-uploader';

const imageFileFormats = ['.jpg', '.jpeg', '.png', '.gif', '.ico', '.bmp', '.svg', '.tiff', '.bpg'];

export type ImageUploaderProps = {
	url: string;
	size: {height: number, width: number};
	scale?: 'cover' | 'contain';
	fileUploader: FileUploaderApi;
	t: (key: string, params?: any) => string;

	onChange: (url: string) => void;
};

export type ImageUploaderState = {
	isPopoverOpen: boolean;
	imageFromWebOpen: boolean;
	isUploading: boolean;
	imageFromWebUrl: string;
	validationError: string;
	uploadError: boolean;
	fileToUpload?: File | string;
};

export class ImageUploader extends React.PureComponent<ImageUploaderProps, ImageUploaderState> {

	state: ImageUploaderState = {
		isPopoverOpen: false,
		imageFromWebOpen: false,
		isUploading: false,
		uploadError: false,
		imageFromWebUrl: '',
		validationError: ''
	};

	supportedImageTypes = this.props.fileUploader.supportedFileTypes.filter(
		(fileType) => imageFileFormats.indexOf(fileType) !== -1
	);

	tp = (key: string, params?: any) => this.props.t(`common.image-uploader.${key}`, params);

	onClickAdd = () => this.setState({isPopoverOpen: true});

	onClosePopover = () => this.setState({isPopoverOpen: false, imageFromWebOpen: false, imageFromWebUrl: ''});

	handleClickUpload = () => this.setState({isPopoverOpen: false});

	handleClickFromWeb = () => this.setState({imageFromWebOpen: true});

	onImageFromWebChange = (url: string) => this.setState({imageFromWebUrl: url, validationError: ''});

	onCancelImageFromWeb = () => this.setState({imageFromWebUrl: '', imageFromWebOpen: false});

	onClickTryAgain = () => this.setState({fileToUpload: '', isPopoverOpen: true, uploadError: false});

	onUploadError = () => this.setState({uploadError: true});

	onSaveImageFromWeb = () => {
		const imageUrl = this.state.imageFromWebUrl;
		if (!isUrl(imageUrl)) {
			this.setState({validationError: this.tp('validation-error')});
		} else {
			this.setState({fileToUpload: imageUrl, isPopoverOpen: false, imageFromWebOpen: false, imageFromWebUrl: ''});
		}
	}

	onFileSelect = (file: File) => {
		this.setState({fileToUpload: file, isPopoverOpen: false});
	}

	renderActionMenu = () => (
		<FloaterMenu>
			<FileSelector supportedFileTypes={this.supportedImageTypes} onFileSelect={this.onFileSelect}>
				<MenuItem ><Icon icon={iconsMap.upload}/>{this.tp('new-image')}</MenuItem>
			</FileSelector>
			<MenuItem className='image-from-web' onSelect={this.handleClickFromWeb}>
				<Icon icon={iconsMap.cloud}/>{this.tp('image-web')}
			</MenuItem>
		</FloaterMenu>
	)

	renderImageFromWebModal = () => {
		return (
			<div className='image-from-web-modal'>
				<Text type='h2'>{this.tp('add-image-web')}</Text>
				<Input
					onChange={this.onImageFromWebChange}
					value={this.state.imageFromWebUrl}
					placeholder={this.tp('image-url')}
					validationError={this.state.validationError}
					spellCheck={false}
				/>
				<div className='buttons-wrapper'>
					<HollowButton onClick={this.onCancelImageFromWeb}>{this.tp('cancel')}</HollowButton>
					<Button className='save-button' onClick={this.onSaveImageFromWeb}>{this.tp('save')}</Button>
				</div>
			</div>
		);
	}

	onUploadSuccess = (url: string) => {
		this.setState({fileToUpload: ''});
		this.props.onChange(url);
	}

	render () {
		const {props, state} = this;
		const {t, fileUploader, size} = props;
		const {width, height} = size;
		const uploadProgressProps: FileUploaderProps = {
			t,
			fileUploader: {...fileUploader, supportedFileTypes: this.supportedImageTypes},
			size: {
				height: height < 100 ? 'short' : undefined,
				width: width < 130 ? 'xnarrow' : width < 240 ? 'narrow' : undefined
			},
			fileToUpload: state.fileToUpload || '',
			onChange: this.onUploadSuccess,
			onClickTryAgain: this.onClickTryAgain,
			onError: this.onUploadError
		};
		const menuOpen = state.isPopoverOpen || state.imageFromWebOpen;
		const scale = props.scale || 'cover';
		const classnames = namespacedClassnames('image-uploader', {
			uploading: state.fileToUpload,
			'upload-error': state.uploadError,
			'menu-open': menuOpen
		});

		const popoverBody = (
			<div className='upload-image-popover-body'>
				{state.imageFromWebOpen ? this.renderImageFromWebModal() : this.renderActionMenu()}
			</div>
		);

		const addButton = props.url ?
			(
				<div className={classNames('add-button add-icon-wrapper', {show: menuOpen})} onClick={this.onClickAdd}>
					<Icon icon={iconsMap.change}/>
				</div>
			)
			: (
				<div>
					<HollowButton className={classNames('add-button', {show: menuOpen})} onClick={this.onClickAdd}>
						{this.tp('add')}
					</HollowButton>
				</div>
			);

		const addImagePopover = (
			<Popover body={popoverBody} isOpen={state.isPopoverOpen} onOuterAction={this.onClosePopover}>{addButton}</Popover>
		);

		return (
			<div className={classnames} style={{width: `${width}px`, height: `${height}px`}}>
				<div
					className='image-container'
					style={{backgroundImage: `url(${props.url})`, backgroundSize: scale}}
					data-image-url={props.url}
				>
					<div className='uploader-content-wrapper'>
						{state.fileToUpload ? <FileUploader {...uploadProgressProps}/> : addImagePopover}
					</div>
				</div>
			</div>
		);
	}
}
