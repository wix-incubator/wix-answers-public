import * as React from 'react';

export const keyCodes: {[k: string]: number} = {
	escape: 27,
	backspace: 8,
	space: 32,
	k: 75,
	enter: 13,
	upArrow: 38,
	downArrow: 40
};

const keyHandler = (e: KeyboardEvent, listRef: any) => {
	switch (e.which) {
		case keyCodes.enter:
			listRef.selectItem(e);
			e.preventDefault();
			return true;
		case keyCodes.upArrow:
			listRef.moveUp();
			e.preventDefault();
			return true;
		case keyCodes.downArrow:
			listRef.moveDown();
			e.preventDefault();
			return true;
		default:
			return false;
	}
};

export type withMeta = {
	id: number | string;
	disabled?: boolean;
};

export type KeyHandlerListItemProps<T extends withMeta> = {
	item: T,
	selected: boolean,
	items: T[],
	index: number
};

export type KeyHandledListItem<T extends withMeta> = React.SFC<KeyHandlerListItemProps<T>>;

// tslint:disable-next-line:max-line-length
const createHandledList = <T extends withMeta, K>(items: T[], ItemRenderer: KeyHandledListItem<T>, onSelect: (item: T, event?: any) => void, selectedtItem?: T , _?: K) => {
	let listReference: any;
	let listElement: any;
	let listChildNodes: any;

	let selectedIndex = -1;
	const limit = items.length;

	const updateSelectedIndex = () => {
		selectedIndex = listReference.state.selectedIndex;
	};

	const updateListPosition = () => {
		updateSelectedIndex();
		listElement.scrollTop = listChildNodes[selectedIndex].scrollIntoView();
	};

	const throwIfNoList = () => {
		if (!listReference || !listElement) {
			throw new Error('List component was not mounted but key handler was used!');
		} else {
			updateSelectedIndex();
		}
	};

	const allItemsDisabled = () => items.findIndex((item) => !item.disabled) === -1;

	const findNextNotDisabledItem = (startIdx: number, reverse?: boolean) => {
		const itemsArr = reverse ? [...items].reverse() : items;
		const itemIdx = reverse ? items.length - startIdx - 1 : startIdx;

		const mabyeNextIdx = itemsArr.findIndex((item, idx) => idx >= itemIdx && !item.disabled);
		const newIdx = reverse ? items.length - mabyeNextIdx - 1 : mabyeNextIdx;
		return (newIdx !== -1) ? newIdx : itemsArr.findIndex((item) => !item.disabled);
	};

	const controls = {
		selectItem: (e: any) => {
			throwIfNoList();
			const selectedItem = items[selectedIndex];

			if (selectedItem && !selectedItem.disabled) {
				onSelect(selectedItem, e);
			}
		},
		moveDown: () => {
			throwIfNoList();

			if (!allItemsDisabled()) {
				const indexToSelect = selectedIndex > limit - 1 ? 0 : selectedIndex + 1;
				const newIdx = findNextNotDisabledItem(indexToSelect);

				listReference.setState({selectedIndex: newIdx}, () => {
					updateSelectedIndex();

					if (newIdx > -1 && newIdx < limit && limit > 4) {
						listElement.scrollTop = listChildNodes[newIdx].scrollIntoView();
					}
				});
			}
		},
		moveUp: () => {
			throwIfNoList();
			if (!allItemsDisabled()) {
				const indexToSelect = selectedIndex <= 0 ? limit - 1 : selectedIndex - 1;
				const newIdx = findNextNotDisabledItem(indexToSelect, true);

				listReference.setState({selectedIndex: newIdx}, () => {
					updateSelectedIndex();

					if (newIdx < limit && newIdx > -1 && limit > 4) {
						listElement.scrollTop = listChildNodes[newIdx].scrollIntoView();
					}
				});
			}
		}
	};

	class List extends React.Component<any, any> {

		state = {
			selectedIndex: -1,
			updateComponent: false
		};

		componentDidMount () {
			listReference = this;

			if (selectedtItem) {
				items.forEach((arg: any, i: number) => {
					if (arg.id === selectedtItem.id) {
						listReference.setState({selectedIndex: i, updateComponent: true});
					}
				});
			}
		}

		componentDidUpdate () {
			if (selectedtItem && this.state.updateComponent) {
				this.setState({updateComponent: false});
				updateListPosition();
			}
		}

		onListRef = (ref: HTMLUListElement) => {
			listElement = ref;
			listChildNodes = ref && ref.children as HTMLCollection;
		}

		render () {
			const itemProps = (item: T, index: number) => {
				const selected = index === this.state.selectedIndex;
				return {item, index, items, selected, disabled: item.disabled};
			};

			return (
				<ul className='key-handled-list-container' ref={this.onListRef}>
					{items.map((item: any, i: number) => <ItemRenderer key={i} {...itemProps(item, i)}/>)}
				</ul>
			);
		}
	}

	return {
		component: List,
		keyHandler: (e: any) => {
			return keyHandler(e, controls);
		}
	};
};

export function createKeyHandledList<T extends withMeta> (
		items: T[],
		// React.Component<T, any> | React.StatelessComponent<T> | Element,
		itemRenderer: KeyHandledListItem<T>,
		onSelect: (item: T, event: any) => any,
		selectedtItem?: T): any {
	return createHandledList<T, {}>(items, itemRenderer, onSelect, selectedtItem);
}
