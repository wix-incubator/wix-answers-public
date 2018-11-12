import * as React from 'react';
import { SideBar } from '.';
import { noop } from 'answers-lib';
import { Text } from '../../typography';
import {Button} from '../buttons';

export class StoryOfSideBar extends React.Component<any, any> {
	headerRenderer = () => (
		<div className='head-content'>
			<Text>Header with button</Text>
			<Button onClick={noop}>Button</Button>
		</div>
	)

	render () {
		return (
			<div className='wrapper' style={{width: 280, height: 400}}>
				<SideBar headerRenderer={this.headerRenderer}>
					<div>Item 1</div>
					<div>Item 2</div>
					<div>Item 3</div>
					<div>Item 4</div>
					<div>Item 5</div>
					<div>Item 6</div>
					<div>Item 7</div>
					<div>Item 8</div>
					<div>Item 9</div>
					<div>Item 10</div>
					<div>Item 1</div>
					<div>Item 2</div>
					<div>Item 3</div>
					<div>Item 4</div>
					<div>Item 5</div>
					<div>Item 6</div>
					<div>Item 7</div>
					<div>Item 8</div>
					<div>Item 9</div>
					<div>Item 10</div>
					<div>Item 1</div>
					<div>Item 2</div>
					<div>Item 3</div>
					<div>Item 4</div>
					<div>Item 5</div>
					<div>Item 6</div>
					<div>Item 7</div>
					<div>Item 8</div>
					<div>Item 9</div>
					<div>Item 10</div>
				</SideBar>
			</div>
		);
	}
}
