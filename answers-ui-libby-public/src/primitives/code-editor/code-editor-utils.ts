import { InputSelection } from '../../common/user-input-commons';

// Utility function to convert code mirror selection from {line, ch} format
// to {start, end} format. This ensures consistency with other types of user input
// such as TextArea, Input etc ..

export const getCodeEditorUserInputSelection = (codeMirrorEditor: any, codeMirrorData: any): InputSelection => {
	let toSelectionEndCount = 0;
	let toSelectionStartCount = 0;

	const ranges = codeMirrorData.ranges[0];
	const startLine = ranges.head.line;
	const startCh = ranges.head.ch;

	const endLine = ranges.anchor.line;
	const endCh = ranges.anchor.ch;

	codeMirrorEditor.doc.iter(0, endLine, (line: any) => {
		toSelectionEndCount += line.text.length + 1;
	});
	toSelectionEndCount += endCh;

	codeMirrorEditor.doc.iter(0, startLine, (line: any) => {
		toSelectionStartCount += line.text.length + 1;
	});
	toSelectionStartCount += startCh;

	return {start: toSelectionStartCount, end: toSelectionEndCount};
};
