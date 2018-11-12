import * as React from 'react';
import { Table, TableContainer } from './table';
import { TableHead } from './table-head/table-head';
import { TableBody } from './table-body/table-body';
import { TableCell } from './table-cell/table-cell';
import { TableRow } from './table-row/table-row';
import { LargeTitle } from '../../typography/titles/titles';
import { LightDescriptionText } from '../../typography/texts/texts';
import { Button } from '../buttons/button/button';
import { noop } from '../../common';
// tslint:disable-next-line:max-line-length
import { TableSortOrder, SortableTableHeadCell } from './table-head-cell/sortable-table-head-cell/sortable-table-head-cell';
import { TableHeadCell } from './table-head-cell/table-head-cell/table-head-cell';
import { EllipsisText } from '../../composites/ellipsis-text/ellipsis-text';
import { Text } from '../../typography/text';

export type StoryOfTableState = {
	colSort: TableSortOrder;
};

export class StoryOfTable extends React.Component<any, StoryOfTableState> {
	state: StoryOfTableState = {
		colSort: 'none'
	};

	handleSort = (order: TableSortOrder): Promise<any> => {
		return new Promise((res) => {
			setTimeout(() => {
				this.setState({ colSort: order });
				res();
			}, 1000);
		});
	}

	render () {
		const demoHeadingStyle = {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '10px 20px'
		};

		const tableTitles = (
			<div className='table-titles' style={demoHeadingStyle as any}>
				<div>
					<LargeTitle>This is a table</LargeTitle>
					<LightDescriptionText>Do you like it?</LightDescriptionText>
				</div>
				<Button onClick={noop}>Some Action</Button>
			</div>
		);

		const handleRowClick = () => {
			alert('clicked a row!');
		};

		const maybeColSort = this.state.colSort;

		return (
			<TableContainer>
				{tableTitles}
				<Table colWidths={['20%', '40%', '20%', '20%']}>
					<TableHead>
						<TableHeadCell>Heading 1</TableHeadCell>
						<SortableTableHeadCell
							sortOrder={maybeColSort}
							onSortOrderChange={this.handleSort}
						>
							Heading 2
						</SortableTableHeadCell>
						<SortableTableHeadCell
							sortOrder={maybeColSort}
							onSortOrderChange={this.handleSort}
						>
							Heading 3 is a cell with some really long ass text
						</SortableTableHeadCell>
						<SortableTableHeadCell sortOrder='desc'>
							disabled
						</SortableTableHeadCell>
					</TableHead>
					<TableBody>
						<TableRow onClick={handleRowClick}>
							<TableCell>I am selectable</TableCell>
							<TableCell>I am selectable</TableCell>
							<TableCell>I am selectable</TableCell>
							<TableCell>I am selectable</TableCell>
						</TableRow>
						<TableRow>
							<TableCell><EllipsisText><Text>Cell 4 is a cell with some really long ass text</Text></EllipsisText></TableCell>
							<TableCell>Cell 5</TableCell>
							<TableCell>Cell 6</TableCell>
							<TableCell>Cell 66</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 7</TableCell>
							<TableCell>Cell 8</TableCell>
							<TableCell>Cell 9</TableCell>
							<TableCell>Cell 99</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}
