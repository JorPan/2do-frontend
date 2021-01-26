import React, { Component } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import TodoForm from "./components/TodoForm";

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
    fetch(todosUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  };

  deleteTodo = (id) => {
    let filteredTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: filteredTodos });
    fetch(`${todosUrl}/${id}`, {
      method: "DELETE",
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">2doIfy</h1>
        <TodoForm addTodo={this.addTodo} />
        <TodoContainer deleteTodo={this.deleteTodo} todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
