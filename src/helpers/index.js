const todosUrl = "http://localhost:3000/todos";

export function patchTodo(updatedTodo) {
  fetch(`${todosUrl}/${updatedTodo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo: updatedTodo }),
  });
}

export function postTodo(newTodo, user) {
  fetch(todosUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({ todo: { ...newTodo, user_id: user.id } }),
  });
}

export function deleteTodo(id) {
  fetch(`${todosUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
}
