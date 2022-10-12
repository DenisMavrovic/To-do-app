import React from "react";
import uniqueString from "unique-string";
import VISIBILITY_TYPE from "./const";

import { AddTodoForm, TodoList, VisibilityToolbar } from "./components";

import './App.css';

class App extends React.Component {
  state = {
    todos: [],
    visibility: VISIBILITY_TYPE.ALL
  }

  /* state = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    visibility: VISIBILITY_TYPE.ALL
  }

  componentDidUpdate(){
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  } */

  getVisibleTodos = () => {
    const { todos, visibility } = this.state;
    if(visibility === VISIBILITY_TYPE.ALL){
      return todos;
    }

    if(visibility === VISIBILITY_TYPE.COMPLETED){
      return todos.filter(todo => todo.completed);
    }

    return todos.filter(todo => !todo.completed);
  }

  handleAddTodo = value => {
    const { todos } = this.state;
    const newTodo = { id: uniqueString(), text: value, completed: false }

    this.setState({
      todos: [...todos, newTodo]
    });
  }

  handleToggleTodo = id => {
    const { todos } = this.state;
    const todo = todos.find(item => item.id === id);

    todo.completed = !todo.completed;
    this.setState({ todos });
  }

  handleRemoveTodo = id => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos });
  }

  handleRemoveCompleted = () => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => !todo.completed);
    this.setState({ todos: newTodos });
  }

  handleVisibilityChange = visibility => {
    this.setState({ visibility: visibility });
  }
  
  render(){
    const visibleTodos = this.getVisibleTodos();
    const hasCompletedTodos = this.state.todos.filter(todo => todo.completed).length > 0;

    return (
      <div className="App">
        <h1 className="header">My tasks</h1>
        <VisibilityToolbar visibilityType={this.state.visibility} onVisibilityChange={this.handleVisibilityChange} />
        <div className="todo-container">
          <AddTodoForm addTodo={this.handleAddTodo} />
          <TodoList todos={visibleTodos} removeTodo={this.handleRemoveTodo} toggleTodo={this.handleToggleTodo} />
        </div>
        {hasCompletedTodos && /* (this.state.visibility !== VISIBILITY_TYPE.ACTIVE) && */ (
          <span className="btn-clear-all" onClick={this.handleRemoveCompleted}>Clear completed</span>
        )}
      </div>
    );
  }
}

export default App;
