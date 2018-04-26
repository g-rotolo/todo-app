import TodoDialogAdd from './TodoDialogAdd';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import './TodoDialog.css';

export default class TodoDialogEdit extends TodoDialogAdd {

  componentWillReceiveProps(newProps){
    this.setState({
      id: newProps.todo.id,
      name: newProps.todo.name,
      date: newProps.todo.date
    })
  };

  handleSubmit() {
    const todo_id = this.state.id;
    const name = this.state.name;
    const date = this.state.date;
    const todo = {
      id: todo_id,
      name: name,
      date: date
    }
    this.props.onSubmit(todo);
  }

  renderActionButtons() {
    let actions = [];
    actions.push(
      <FlatButton
        label="Cancel"
        style={{color: '#165ef0'}}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        style={{color: '#165ef0'}}
        keyboardFocused={true}
        onClick={() => this.handleSubmit()}
      />
    );
    return actions;
  }
}
