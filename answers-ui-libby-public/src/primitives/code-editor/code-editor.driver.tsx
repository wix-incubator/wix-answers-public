import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { CodeEditorProps, CodeEditor } from './code-editor';
import { renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';

export type CodeEditorDriver = {
	getValue: () => string;
	enterValue: (value: string) => void;
};

export const createCodeEditorDriver = (wrapper: Element): CodeEditorDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.code-editor', CodeEditor.name);
	const CodeMirror = (baseDriver.find('.CodeMirror').elem as any).CodeMirror;

	return {
		getValue: () => CodeMirror.getValue(),
		enterValue: (value: string) => CodeMirror.setValue(value)
	};
};

export const createCodeEditor = (props: CodeEditorProps): CodeEditorDriver => {
	const elem = renderAndMountComponent(<CodeEditor {...props} />);
	return createCodeEditorDriver(elem);
};
