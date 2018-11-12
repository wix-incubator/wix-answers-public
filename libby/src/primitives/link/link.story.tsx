import * as React from 'react';
import { Link } from './link.comp';
import { Column } from '../../common';
import { createTestHistory } from 'answers-lib';
import { Router } from 'react-router';

const history = createTestHistory();
export class LinkStory extends React.PureComponent<any> {
	render () {
		return (
			<div className='row'>
				<Column title='Internal (using to)'>
					<Router history={history}>
						<Link to='#default'>I navigate internally</Link>
					</Router>
				</Column>
				<Column title='External (using herf)'>
					<Link href='#default'>I lead outside</Link>
				</Column>
			</div>
		);
	}
}
