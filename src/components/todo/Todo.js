import { useState } from "react";
import Form from "./Form";
import List from "./List";

const Todo = () => {
  const todoList = [
    {
      id: 1,
      content: "店を予約",
    },
    {
      id: 2,
      content: "卵買う",
    },
    {
      id: 3,
      content: "郵便出す",
    },
  ];

  const [ todos, setTodos] = useState(todoList);

  const deleteTodo = (id) => {
    const newTodo = todos.filter((todo) => {
      return(todo.id !== id);
    });
    setTodos(newTodo);
  };

  const createTodo = (todo) => {
    setTodos([...todos, todo]);
  }

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo}/>
      <Form createTodo={createTodo}/>
    </
    >
  );
};

export default Todo;
