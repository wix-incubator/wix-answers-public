import { BaseProps } from '.';

export type InputSelection = {
	start: number;
	end: number;
};

export type BaseInputProps = {
	value: string;
	onChange: (val: string) => void;
	onSelect?: (selection: InputSelection) => void;
} & BaseProps;

export const calculateInputSelection = (element: any): InputSelection => {
	const inputWidth = element.getBoundingClientRect().width || 0;

	const start = element.selectionStart;
	const cursorCoords = {
		top: 30,
		left: Math.min(7 * (start + 1), inputWidth)
	};
	const selection = {start, end: element.selectionEnd, cursorCoords};
	return selection;
};

export const calculateTextAreaSelection = (element: any, content: string): InputSelection => {
	const textAreaWidth = element.getBoundingClientRect().width || 0;
	const textAreaHeight = element.getBoundingClientRect().height || 0;

	const start = element.selectionStart;
	const linesUntilCursor = content.substr(0, start).split('\n');

	const cursorLine = linesUntilCursor.length;
	const cursorLineLength = linesUntilCursor[cursorLine - 1].length;

	const cursorCoords = {
		top: Math.min(25 * cursorLine, textAreaHeight),
		left: Math.min(7 * (cursorLineLength + 1), textAreaWidth)
	};

	const selection = {start, end: element.selectionEnd, cursorCoords};
	return selection;
};
