import React from "react";
import TodoForm from "./TodoForm";
import TodoContainer from "./TodoContainer";

export default function Home(props) {
  return (
    <>
      <TodoForm submitAction={props.addTodo} />
      <TodoContainer
        updateTodo={props.updateTodo}
        deleteTodo={props.deleteTodo}
        todos={props.todos}
      />
    </>
  );
}
