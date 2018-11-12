import * as classnames from 'classnames';
import * as React from 'react';

export const createItemsWithSearch = (keyHandledListData: any): any => {

	const RenderedList = keyHandledListData.component;

	const keyHandler = keyHandledListData.keyHandler;
	return class Tester extends React.Component<any, any> {

		render () {
			return (
			<div>
				<input className='search' onKeyDown={keyHandler}/>
				<div className='list-container'>
					<RenderedList/>
				</div>
			</div>);
		}
	};
};

export const ItemRenderer = (props: any) => {
	return (
		<div className={classnames('item', {selectedItem: props.selected})}>
			<span className='name'>{props.item.name}</span>
		</div>);
};
