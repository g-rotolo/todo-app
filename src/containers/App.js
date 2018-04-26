import React, { Component } from 'react';
import './App.css';
import TodosList from '../components/Todos/TodosList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TodoDialogAdd from '../components/Dialog/TodoDialogAdd';
import TodoDialogEdit from '../components/Dialog/TodoDialogEdit';


class App extends Component {

  state = {
    todosList: JSON.parse(localStorage.getItem('todosList')) || [],
    openAddDialog: false,
    openEditDialog: false,
    indexSelected: 0,
    filter: {
      selected: false,
      index: 1
    },
    searchString: '',
  };


  //MODAL =====================================================

  renderDialog() {
    const indexSelected = this.state.indexSelected;
    const todosList = this.state.todosList;
    const todo = todosList[indexSelected] || {};

    return (
      <div>
        <TodoDialogAdd
          dialogTitle='Add new todo'
          open={this.state.openAddDialog}
          handleClose={this.handleAddDialogClose.bind(this)}
          onSubmit={this.onAddDialogSubmit.bind(this)}>
        </TodoDialogAdd>
        <TodoDialogEdit
          todo={todo}
          dialogTitle='Edit todo'
          open={this.state.openEditDialog}
          handleClose={this.handleEditDialogClose.bind(this)}
          onSubmit={this.onEditDialogSubmit.bind(this)}>
        </TodoDialogEdit>
      </div>
    );
  }

  handleAddDialogOpen() {
    this.setState({
      openAddDialog: true
    })
  };

  handleAddDialogClose() {
    this.setState({openAddDialog: false});
  }

  handleEditDialogOpen(index) {
    this.setState({
      indexSelected: index,
      openEditDialog: true
    })
  }

  handleEditDialogClose() {
    this.setState({openEditDialog: false});
  }

  handleTodoDelete(todo, index) {
    const todosList = [...this.state.todosList];
    todosList.forEach((oldTodo, index) => {
      if(todo.id === oldTodo.id) {
        todosList.splice(index, 1);
      }
    });
    // setter
    localStorage.setItem('todosList', JSON.stringify(todosList));
    this.setState({
      openEditDialog:false,
      todosList: todosList,
    })
  };

  onEditDialogSubmit(todo) {
    const todosList = [...this.state.todosList];
    todosList.forEach((oldTodo, index) => {
      if(todo.id === oldTodo.id) {
        todosList[index] = todo;
      }
    });
    // setter
    localStorage.setItem('todosList', JSON.stringify(todosList));
    this.setState({
      openEditDialog:false,
      todosList: todosList,
    })
  }

  onAddDialogSubmit(todo) {
    console.log(todo.date);
    const todosList = [...this.state.todosList];
    todosList.push(
      {
        id: todo.id,
        name: todo.name,
        date: new Date(todo.date),
        isDone: false
      }
    );
    // setter
    localStorage.setItem('todosList', JSON.stringify(todosList));
    this.setState({
      openAddDialog:false,
      todosList: todosList,
    })
  };

  checkboxHandler(event, isChecked, todo, index) {
    const todosList = [...this.state.todosList];
    todosList.forEach((oldTodo, index) => {
      if(todo.id === oldTodo.id) {
        todosList[index].isDone = isChecked;
      }
    });
    // setter
    localStorage.setItem('todosList', JSON.stringify(todosList));
    this.setState({
      todosList: todosList,
    });
  }

  handleSelectChange(event, index, value) {
    let filter = {
      selected: true,
      index: value
    };
    this.setState({filter});
  }

  handleSearchChange(event, value) {
    this.setState({searchString: value});
  }


  render() {
    console.log(this.state);
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h1>TODO LIST APP</h1>
          </div>
          <div className="App-content">
            <TodosList
              todosList={this.state.todosList}
              filter={this.state.filter}
              searchString={this.state.searchString}
              handleAddDialogOpen={this.handleAddDialogOpen.bind(this)}
              handleEditDialogOpen={this.handleEditDialogOpen.bind(this)}
              handleTodoDelete={this.handleTodoDelete.bind(this)}
              handleSearchChange={this.handleSearchChange.bind(this)}
              todosCounter={this.state.todosList.length}
              handleSelectChange={this.handleSelectChange.bind(this)}
              checkboxHandler={this.checkboxHandler.bind(this)}
              onEditDialogSubmit={this.onEditDialogSubmit.bind(this)}
              onAddDialogSubmit={this.onAddDialogSubmit.bind(this)}>
            </TodosList>
            {this.renderDialog()}
          </div>
        </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
