import * as React from 'react';
import { Pagination } from '.';

export class StoryOfPagination extends React.Component<any, any> {
	state = {
		page: 1,
		numPages: 10
	};

	onPageChange = (page: number) => {
		this.setState({ page });
	}

	render () {
		const state = this.state;

		return (
			<div>
				<span className='row'>
					<Pagination page={state.page} numPages={state.numPages} onPageClick={this.onPageChange} />
				</span>
			</div>
		);
	}
}
