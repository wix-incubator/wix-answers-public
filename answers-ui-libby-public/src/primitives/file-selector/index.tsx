import * as React from 'react';

export const fileSelectorKey = 'file-selector';

export type FileSelectorProps = {
	children?: any;
	supportedFileTypes: string[];
	onFileSelect: (file: File) => void;
};

export type FileSelectorState = {};

export class FileSelector extends React.PureComponent<FileSelectorProps, FileSelectorState> {
	private fileInputElem?: HTMLInputElement;

	componentWillMount () {
		// couldn't find a way to simulate this so added hook for testing
		const w: any = window;
		w.testFileSelectHook = (file: File) => {
			this.onFileChangeHandler({target: {files: [file]}});
		};
	}

	setFileInputElement = (elem: HTMLInputElement) => {
		this.fileInputElem = elem;
	}

	onFileChangeHandler = (e: any) => {
		const file = e.target.files[0];
		this.props.onFileSelect(file);
	}

	openFilePicker = () => {
		if (this.fileInputElem) {
			this.fileInputElem.click();
		}
	}

	render () {
		const props = this.props;

		const supportedTypes = props.supportedFileTypes.join(',');

		return (
			<div className='file-selector' onClick={this.openFilePicker}>
				{props.children}
				<input
					type='file'
					ref={this.setFileInputElement}
					multiple={false}
					accept={supportedTypes}
					style={{display: 'none'}}
					onChange={this.onFileChangeHandler}
				/>
			</div>
		);
	}
}
