import * as React from 'react';
import { EllipsisList } from '.';

export class EllipsisListStory extends React.Component<any, any> {
	state = {
		isOpen: false,
	};

	openModal = () => {
		this.setState({ isOpen: true });
	}

	closeModal = () => {
		this.setState({ isOpen: false });
	}

	render () {
		const longList = [
			'Queue 1 (EN)',
			'Queue 2 (EN)',
			'Queue 3 (PT)',
			'Queue 4 (HE)',
			'Queue 5 (EN)',
			'Queue 6 (EN)',
			'Queue 7 (DE)',
			'Queue 8 (RU)',
			'Queue 9 (RU)',
			'Queue 10 (RU)',
			'Queue 11 (RU)',
			'Queue 12 (RU)',
			'Queue 13 (RU)',
			'Queue 14 (RU)',
			'Queue 15 (RU)'
		];

		const delimiter = ', ';

		return (
			<div>
				<h3>Strings</h3>
				<EllipsisList delimiter={delimiter}>{longList}</EllipsisList>
			</div>
		);
	}
}
