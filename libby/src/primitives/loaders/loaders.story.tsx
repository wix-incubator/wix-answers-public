import * as React from 'react';
import { Column } from '../../common/story-utils';
import { TinyLoader, Loader, SpinnerLoader } from '.';

export const StoryOfLoaders = () => (
	<div className='row'>
		<Column title='Loader'><Loader /></Column>
		<Column title='Spinner Loader (Default color - White)'>
			<SpinnerLoader color='#808080'/>
		</Column>
		<Column title='Tiny loader '>
			<div style={{color: 'blue'}}> <TinyLoader/> </div>
		</Column>
	</div>
);
