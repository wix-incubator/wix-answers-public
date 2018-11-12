import { Button, Checkbox, Collapsible, DangerButton, FloaterMenu, Icon, iconsMap, InfoTooltip, Input, LargeTitle, LinkButton, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalSize, Popover, RadioButton, RadioGroup, SearchInput, SortableTableHeadCell, Table, TableBody, TableCell, TableContainer, TableHead, TableHeadCell, TableRow, TextArea } from 'answers-ui-libby-public';
import 'answers-ui-libby-public/dist/style.css';

import * as React from 'react';
import './App.css';

export class TodoItem {
    public id: number;
    public isComplete: boolean = false;
    public title: string;
    public description: string;
    public priority: TodoItemPriority;
}

export enum TodoItemPriority {
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3
}

// tslint:disable-next-line:max-classes-per-file
class App extends React.Component<any, any> {

  constructor(props: any) {
	super(props);
    const todoItems: TodoItem[] = [];
    for (let i = 1; i < 9; i++) {
      todoItems.push({ id: i, title: `Task ${i}`, description: `This is the #${i} task`, priority: ((i - 1) % 3) + 1, isComplete: false });
    }
    this.state = { todoItems }
  }

  public onTodoCompleteToggle = (todoItem: TodoItem) => () => {
    this.setState({
      todoItems: this.state.todoItems.map((item: TodoItem) =>
        item.id === todoItem.id ? Object.assign(item, { isComplete: !item.isComplete }) : item
      )
    }, this.sortTodoItems);
  };

  // Search
  public onSearch = (newSearchQuery: string) => {
    this.setState({ searchQuery: newSearchQuery });
  }

  public onReset = () => {
    this.onSearch('');
  }

  public getFilteredTodoItems = () => {
    if (!this.state.searchQuery) { return this.state.todoItems; }

    const searchQuery = this.state.searchQuery.toLowerCase();
    return this.state.todoItems.filter((todoItem: TodoItem) => {
      const titleMatches = todoItem.title.toLowerCase().indexOf(searchQuery) > -1;
      const descriptionMatches = todoItem.description.toLowerCase().indexOf(searchQuery) > -1;
      return titleMatches || descriptionMatches;
    })
  }

  // Edit Todo Item
  public onEditItemClicked = (todoItem: TodoItem) => () => {
    this.setState({ editedTodo: todoItem }, this.closeContextMenu);
  }

  public editEditedTodo = (editedData: any) => {
    this.setState({ editedTodo: Object.assign({}, this.state.editedTodo, editedData) });
  }

  public onTitleEdited = (newTitle: string) => {
    this.editEditedTodo({ title: newTitle });
  }

  public onDescriptionEdited = (newDescription: string) => {
    this.editEditedTodo({ description: newDescription });
  }

  public onPriorityEdited = (newPriority: any) => {
    this.editEditedTodo({ priority: newPriority });
  }

  public onEditCancelled = () => {
    this.setState({ editedTodo: null }, this.sortTodoItems);
  }

  public onEditSubmitted = () => {
    const editedTodoItems = this.state.todoItems.map((todoItem: TodoItem) => todoItem.id === this.state.editedTodo.id ? this.state.editedTodo : todoItem);
    this.setState({ todoItems: editedTodoItems }, this.onEditCancelled);
  }

  public togglePriorityCollapsible = () => {
    this.setState({isPriorityExpanded: !this.state.isPriorityExpanded});
  }

  public onEditedTodoDeleted = () => {
    this.deleteTodoItem(this.state.editedTodo);
  }

  public deleteTodoItem = (todoItemToDelete: TodoItem) => {
    this.setState({ todoItems: this.state.todoItems.filter((todoItem: TodoItem) => todoItem.id !== todoItemToDelete.id), editedTodo: null });
  }

  public deleteTodoItemFactory = (todoItemToDelete: TodoItem) => () => this.deleteTodoItem(todoItemToDelete);

  public openContextMenu = (todoItem: TodoItem) => () => {
    this.setState({ openContextMenuItemId: todoItem.id })
  }

  public closeContextMenu = () => {
    this.setState({ openContextMenuItemId: null });
  }

  public getPriorityIcon(priority: TodoItemPriority) {
    const priorityString = priority === TodoItemPriority.HIGH ? 'high' : (priority === TodoItemPriority.MEDIUM ? 'medium' : 'low');
    return <span title={`${priorityString} priority`} className={`priority-${priorityString}`}><Icon icon={iconsMap.maPriority} /></span>
  }

  public getContextMenu = (todoItem: TodoItem) =>
    <FloaterMenu>
      <MenuItem onSelect={this.onEditItemClicked(todoItem)}>Edit</MenuItem>
      <MenuItem onSelect={this.deleteTodoItemFactory(todoItem)} type='danger'>Delete</MenuItem>
    </FloaterMenu>

  public getTableRow = (todoItem: TodoItem) =>
    <TableRow key={todoItem.id}>
      <TableCell>{this.getPriorityIcon(todoItem.priority)}</TableCell>
      <TableCell><Checkbox onChange={this.onTodoCompleteToggle(todoItem)} value={todoItem.isComplete} /></TableCell>
      <TableCell>{todoItem.title}</TableCell>
      <TableCell><InfoTooltip text={todoItem.description} /></TableCell>
      <TableCell><Popover preferPlace='right' body={this.getContextMenu(todoItem)} isOpen={todoItem.id === this.state.openContextMenuItemId} onOuterAction={this.closeContextMenu}><LinkButton onClick={this.openContextMenu(todoItem)}>Edit</LinkButton></Popover></TableCell>
    </TableRow>

  public getTableNavigation = () =>
    <div className='table-navigation'>
      <LargeTitle>Tasks</LargeTitle>
      <SearchInput placeholder='Search...' query={this.state.searchQuery} onSearch={this.onSearch} onReset={this.onReset} />
    </div>

  public getEditModal = () => this.state.editedTodo

  public sortTodoItems = () => {
    this.setState({todoItems: this.state.todoItems.sort((a: TodoItem, b: TodoItem) => {
      if (!this.state.sort) {return a.id - b.id;}
      let comparison = a[this.state.sort.key] - b[this.state.sort.key];
      if (typeof a[this.state.sort.key] === 'string') {
        comparison = a[this.state.sort.key].localeCompare(b[this.state.sort.key]);
      }
      
      if (this.state.sort.order === 'asc') {
        return comparison;
      } else {
        return comparison * -1;
      }
    })})
  }

  public onSort = (key: string) => (newOrder: 'asc' | 'desc' | 'none') => {
    this.setState({sort: {key, order: newOrder}}, this.sortTodoItems);
  }

  public getSortableTableHeader(headerKey: string, headerTitle: string) {
    return <SortableTableHeadCell sortOrder={this.state.sort && this.state.sort.key === headerKey && this.state.sort.order} onSortOrderChange={this.onSort(headerKey)}>{headerTitle}</SortableTableHeadCell>
  }

  public render() {
    const editItemModal = (this.state.editedTodo && 
    <Modal isOpen={true} size={ModalSize.MEDIUM} onDismiss={this.onEditCancelled}>
      <ModalHeader>Edit Item</ModalHeader>
      <ModalBody>
        <div className='edit-form-container'>
          <h3>Task Name</h3>
          <Input value={this.state.editedTodo.title} onChange={this.onTitleEdited} />
          <h3>Task Description</h3>
          <TextArea placeholder='Enter task description' onChange={this.onDescriptionEdited} value={this.state.editedTodo.description} />
          <Collapsible isOpen={this.state.isPriorityExpanded} onToggle={this.togglePriorityCollapsible} title='Priority'>
            <RadioGroup selectedValue={this.state.editedTodo.priority} onChange={this.onPriorityEdited}>
              <RadioButton value={TodoItemPriority.HIGH}>High</RadioButton>
              <RadioButton value={TodoItemPriority.MEDIUM}>Medium</RadioButton>
              <RadioButton value={TodoItemPriority.LOW}>Low</RadioButton>
            </RadioGroup>
          </Collapsible>
        </div>
      </ModalBody>
      <ModalFooter>
        <DangerButton onClick={this.onEditedTodoDeleted}>Delete</DangerButton>
        <Button onClick={this.onEditCancelled}>Cancel</Button>
        <Button onClick={this.onEditSubmitted}>Done</Button>
      </ModalFooter>
    </Modal>)

    const tableRows = this.getFilteredTodoItems().map(this.getTableRow);

    return (
      <div className='table-container'>
        {editItemModal}
        <TableContainer>
          {this.getTableNavigation()}
          <Table colWidths={['20%', '20%', '20%', '20%', '20%']}>
            <TableHead>
              {this.getSortableTableHeader('priority', 'Priority')}
              {this.getSortableTableHeader('isComplete', 'Complete?')}
              {this.getSortableTableHeader('title', 'Title')}
              {this.getSortableTableHeader('description', 'Description')}
              <TableHeadCell />
            </TableHead>
            <TableBody>
              {tableRows}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default App;