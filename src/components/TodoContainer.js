import React from "react";
import TodoItem from "./TodoItem";

export default function TodoContainer({ todos }) {
  const showTodos = () => {
    return todos.map((todo) => <TodoItem key={todo.id} {...todo} />);
  };

  return <ul className="todo-list">{showTodos()}</ul>;
}
