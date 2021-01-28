import React, { Component } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import TodoForm from "./components/TodoForm";
import { patchTodo, postTodo, deleteTodo } from "./helpers";

const todosUrl = "http://localhost:3000/todos";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.getTodos();
  }
  getTodos = () => {
    fetch(todosUrl)
      .then((response) => response.json())
      .then((todos) => this.setState({ todos }));
  };

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
    postTodo(newTodo);
  };

  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.setState({ todos });
    patchTodo(updatedTodo);
  };

  deleteTodo = (id) => {
    let filteredTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: filteredTodos });
    deleteTodo(id);
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">2doIfy</h1>
        <TodoForm submitAction={this.addTodo} />
        <TodoContainer
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
