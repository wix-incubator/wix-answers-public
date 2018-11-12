import * as React from 'react';
import { Column } from '../../common/story-utils';
import { NavButton, SecondaryNavButton } from './nav-button.comp';
import { createTestHistory } from 'answers-lib';
import { Router } from 'react-router';

export const StoryOfNavButtons = () => {
	const history = createTestHistory();
	return (
		<Router history={history}>
			<div>
				<h4 className='h4-title'>PrimaryNavButton</h4>
				<span className='row'>
					<Column title='Internal (using to)'>
						<NavButton to='/test'>I navigate internally</NavButton>
					</Column>
					<Column title='External (using herf)'>
						<NavButton href='/test'>I navigate externally</NavButton>
					</Column>
				</span>
				<h4 className='h4-title'>SecondaryNavButton</h4>
				<span className='row'>
					<Column title='Internal (using to)'>
						<SecondaryNavButton to='/test'>I navigate internally</SecondaryNavButton>
					</Column>
					<Column title='External (using herf)'>
						<SecondaryNavButton href='/test'>I navigate externally</SecondaryNavButton>
					</Column>
				</span>
			</div>
		</Router>
	);
};
