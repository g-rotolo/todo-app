import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import './TodoDialog.css';

class TodoDialogAdd extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: {},
      dialogTitle: props.dialogTitle
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getTodo() {
    return this.state.todo || {};
  }

  handleNameChange(event) {
    const name = event.target.value;
    this.setState({name: name});
  }

  handleDateChange(a, newDate) {
    const date = newDate;
    this.setState({date: date});
  }

  handleSubmit() {
    const todo_id = this.getRandomInt(1, 1000);
    const name = this.state.name;
    const date = this.state.date;
    const todo = {
      id: todo_id,
      name: name,
      date: date
    }
    this.setState({
      name: '',
      date: {}
    });
    this.props.onSubmit(todo);
  }

  renderDialogContent() {
    // const todo = this.getTodo() || {};
    // const name = todo.name || '';
    // const date = todo.date || {};
    const dialogTitle = this.state.dialogTitle || '';

    return(
      <div className='dialog-container'>
        <div className='dialog-title'>
          {dialogTitle}
        </div>
        <div className='dialog-body'>
          <TextField
            name='todo-name'
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
            floatingLabelFocusStyle={{color: '#165ef0'}}
            underlineFocusStyle={{borderBottom: '2px solid #165ef0'}}
            hintText="Insert todo name"
            floatingLabelText="Todo Name"
            floatingLabelFixed={true}
          />
          <DatePicker
            hintText="Todo due date"
            locale="en-US"
            textFieldStyle={{bottom: '2px'}}
            onChange={(a, newDate) => this.handleDateChange(a, newDate)}
            value={new Date(this.state.date)}
            autoOk={true} />
        </div>
      </div>
    );
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

  render() {
    return (
      <div>
        <Dialog
          actions={this.renderActionButtons()}
          dialogTitle={this.props.dialogTitle}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose} >
          {this.renderDialogContent()}
        </Dialog>
      </div>
    );
  }
}

export default TodoDialogAdd
