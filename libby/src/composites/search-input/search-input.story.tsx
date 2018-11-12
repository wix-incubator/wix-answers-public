import * as React from 'react';
import { SearchInput } from './search-input';
import { Column } from '../../common/story-utils';

const dummy = (): any => null;

export class StoryOfSearchInput extends React.Component<any, any> {

	state = {
		query: ''
	};

	onSearch = (query: string) => this.setState({query});
	onReset = () => this.setState({query: ''});

	render () {
		const {query} = this.state;

		return (
			<div className='row'>
				<Column title='Default'>
					<SearchInput query={query} onSearch={this.onSearch} onReset={this.onReset} placeholder='search' />
				</Column>
				<Column title='Disabled'>
					<SearchInput query={''} onSearch={dummy} onReset={dummy} disabled={true}/>
				</Column>
			</div>
		);
	}
}
