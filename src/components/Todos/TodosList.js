import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import InfoBox from '../InfoBox/InfoBox';
import './TodosList.css';

class TodosList extends Component {


  renderTable(todosList) {
    if(todosList.length === 0 && !this.props.filter.selected) {
      return(
        <div>
          <InfoBox
            addFirstTodo={() => this.props.handleAddDialogOpen(this.props.defaultTodo)} />
        </div>
      );
    }

    else {
        return(
          <div className='todos-list-table'>
            <div className='todos-list-info-container'>
              {this.renderFilterSelect()}
              {this.renderSearchFilter()}
              <RaisedButton
                icon={<FontIcon className="fa fa-plus" />}
                label="Add new Todo"
                labelColor={'#ffffff'}
                backgroundColor={'#165ef0'}
                onClick={() => this.props.handleAddDialogOpen()}
              />
            </div>
            <div className='todos-list-header'>
              <div className='table-actions-header'>
                Actions
              </div>
              <div className='table-text-header'>
                Todo name
              </div>
              <div className='table-text-header'>
                Due date
              </div>
              <div className='table-actions-header'>
                Done
              </div>
            </div>
            {this.renderTableContent(todosList)}
          </div>
        );
    }
  }

  renderFilterSelect() {
    return (
      <SelectField
          style={{bottom: '10px'}}
          floatingLabelText="Choose a filter"
          value={this.props.filter.index}
          onChange={(event, index, value) => this.props.handleSelectChange(event, index, value)} >
        <MenuItem value={1} primaryText="All" />
        <MenuItem value={2} primaryText="Done" />
        <MenuItem value={3} primaryText="Not yet done" />
      </SelectField>
    );
  };

  renderSearchFilter() {
    return (
      <TextField
        name='todo-name'
        onChange={(event, value) => this.props.handleSearchChange(event, value)}
        floatingLabelFocusStyle={{color: '#165ef0'}}
        underlineFocusStyle={{borderBottom: '2px solid #165ef0'}}
        hintText="Search"
      />
    );
  }

  renderActionButtons(todo, index) {
    return(
      <div className='action-buttons-container'>
        <IconButton
          iconClassName="fa fa-edit"
          onClick={() => this.props.handleEditDialogOpen(index)}
          iconStyle={{color: 'green'}}
          disabled={todo.isDone}/>
        <IconButton
          iconClassName="fa fa-trash"
          iconStyle={{color: 'red'}}
          onClick={() => this.props.handleTodoDelete(todo, index)}
          disabled={todo.isDone}/>
      </div>
    );
  }

  renderDoneCheckbox(todo, index) {
    return(
      <div className='action-buttons-container'>
        <Checkbox
          style={{left: 35}}
          checked={todo.isDone}
          onCheck={(event, isChecked) => this.props.checkboxHandler(event, isChecked, todo, index)} >
        </Checkbox>
      </div>
    );
  }

  doFilterByName(todo) {
    return todo.name.includes(this.props.searchString);
  }

  doFilterByStatus(todo) {
    switch(this.props.filter.index) {
      case 2:
        return todo.isDone === true;
      case 3:
        return todo.isDone === false;
      case 1:
      default:
        return true;
    }
  }

  renderTableContent(todosList) {
    const todoFilterList = todosList.filter(todo => this.doFilterByStatus(todo));
    const todoSearchList = todoFilterList.filter(todo => this.doFilterByName(todo));
    if(todoSearchList.length === 0) {
      return (
        <div className='todos-list-body' key={`no_results_row`}>
          <div className='table-text' style={{marginTop: '20px'}}>
            No results
          </div>
        </div>
      );
    }
    return todoSearchList.map((todo, index) => {
      return (
        <div className='todos-list-body' key={`todo_row_${todo.name}_${index}`}>
          {this.renderActionButtons(todo, index)}
          <div className='table-text'>
            {todo.isDone ? <s>{todo.name}</s> : todo.name}
          </div>
          <div className='table-text'>
            {todo.isDone ? <s>{new Date(todo.date).toLocaleDateString("en-US")}</s> : new Date(todo.date).toLocaleDateString("en-US")}
          </div>
          {this.renderDoneCheckbox(todo, index)}
        </div>
      );
    });
  }

  render() {
    return(
      <Paper style={{margin: '0 auto', maxWidth: '960px', padding: '20px'}}>
          {this.renderTable(this.props.todosList)}
          {this.props.todosList.length > 0 &&
            <div style={{textAlign:'right', marginTop: '20px'}}>Todos counter: {this.props.todosCounter}</div>
          }
      </Paper>
    );
  }

};

export default TodosList;
