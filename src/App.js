import React, { Component } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import TodoForm from "./components/TodoForm";
import { patchTodo, postTodo, deleteTodo } from "./helpers";
import SignUpForm from "./components/SignUpForm";

const todosUrl = "http://localhost:3000/todos";

class App extends Component {
  state = {
    todos: [],
    user: {},
    alerts: [],
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

  signUp = (user) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          this.setState({ alerts: response.errors });
        } else {
          localStorage.setItem("token", response.token);
          this.setState({
            user: response.user,
            alerts: ["User successfully created!"],
          });
        }
      });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">2doIfy</h1>
        <SignUpForm signUp={this.signUp} alerts={this.state.alerts} />
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
