import { Popover } from '../../primitives/popover/popover';
import * as React from 'react';
import {
	FloaterMenu,
	MenuItemDivider,
	MenuItemHeading,
	MenuItemSubheading,
	MenuItem,
	Button
} from '../..';
import { MenuItemSubtitle } from './floater-menu';
import { iconsMap } from '../../icons';

export class FloaterMenuStory extends React.Component<any, any> {
	state = {
		isOpen: false
	};

	render () {
		// const items =

		const alertClicked = () => alert('clicked!');

		// tslint:disable:jsx-key
		const items = [<MenuItemHeading>Some Title</MenuItemHeading>,
					<MenuItemSubheading>Some Subheading</MenuItemSubheading>,
					<MenuItem icon={iconsMap.cloud} onSelect={alertClicked}>Normal</MenuItem>,
					<MenuItem onSelect={alertClicked}>Normal 2</MenuItem>,
					<MenuItemDivider/>,
					<MenuItemSubheading>Some Other Subheading</MenuItemSubheading>,
					<MenuItem onSelect={alertClicked}>Normal 3</MenuItem>,
					<MenuItemSubtitle>Other options</MenuItemSubtitle>,
					<MenuItem onSelect={alertClicked} disabled={'Disabled with tooltip on left'}>Disabled</MenuItem>,
					<MenuItemDivider/>,
					(
					<MenuItem
						type={'danger'}
						onSelect={alertClicked}
					>
						Danger
					</MenuItem>)];
		const menu = <FloaterMenu>{items}</FloaterMenu>;
		return (
				<div>
				<h5 className='h5-title'>FloaterMenu</h5>

				<Popover
					body={menu}
					isOpen={this.state.isOpen}
					// tslint:disable-next-line:jsx-no-lambda
					onOuterAction={() => this.setState({isOpen: false})}
					// tslint:disable-next-line:jsx-no-lambda
				><Button onClick={() => this.setState({isOpen: true})}>Open Menu</Button>
				</Popover>

				<h5 className='h5-title'>Menu Items</h5>
				<div
					className='aul floater-menu'
					style={{width: 229, paddingTop: 14, paddingBottom: 14, borderRadius: 5, border: '1px solid #efefef'}}
				>
					{items}
				</div>
			</div>);
	}
}
