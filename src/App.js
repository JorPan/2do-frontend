import React, { Component } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import TodoForm from "./components/TodoForm";
import { patchTodo, postTodo, deleteTodo } from "./helpers";
import SignUpForm from "./components/SignUpForm";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";

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
    return fetch("http://localhost:3000/users", {
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
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Home}
            submitAction={this.addTodo}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            todos={this.state.todos}
          />
          <Route
            exact
            path="/signup"
            render={(routerProps) => (
              <SignUpForm
                {...routerProps}
                signUp={this.signUp}
                alerts={this.state.alerts}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
