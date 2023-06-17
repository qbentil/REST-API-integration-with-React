import "./App.css";

import React, { useEffect, useState } from "react";
import { FETCH_TODOS, ADD_TODO, TOGGLE_TODO } from "./utils";

let id = 0;
const Todo = (props) => {
  const { todo, onDelete, onToggle } = props;
  return (
    <div className={todo.checked ? "todo completed" : "todo"}>
      <li className="todo-item"> {todo.title}</li>
      <button className="completed-btn" onClick={onToggle}>
        <i className="fas fa-check"> </i>
      </button>
      <button title="Delete" onClick={onDelete} className="trash-btn">
        <i className="fas fa-trash"> </i>
      </button>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");


  useEffect(() => {
      FETCH_TODOS((data) => {
        setTodos(data.data)
      })      
  }, []);

  // add TODO
  const addTodo = (e) => {
    e.preventDefault();

    // check if todo exist
    const todoExist = todos.find((todo) => todo.text === text);

    if (text !== "" && !todoExist) {
      const item = {
        title: text,
        description: desc,
        checked: false
      }

      ADD_TODO(item, (data) => {
        setTodos([...todos, data.data]); // add todo
        setText(""); // clear input
        setDesc(""); // clear input
      })
    }
  };

  // remove TODO
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // Handle checked todo
  const toggleTodoState = (todo) => {
    TOGGLE_TODO(todo, (data) => {
      setTodos(
        todos.map((item) => {
          if (item._id === data._id) {
            item.checked = data.checked;
          }
          return item;
        })
      );
    })
  };

  return (
    <div>
      <header>
        <h1>TODO List</h1>
      </header>

      <form method="POST" className="form" onSubmit={addTodo}>
        <input
          type="text"
          name="text"
          className="todo-input"
          value={text}
          placeholder="TODO Text"
          onChange={(e) => setText(e.target.value)}
        />
        <textarea
          value={desc}
          className="todo-input"
          name="text"
          placeholder="TODO Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="todo-button" onClick={addTodo}>
          <i className="fas fa-plus-square" /> ADD
        </button>
      </form>

      <div className="filter">
        <button className="filter-all">ALL: {todos.length}</button>
        <button className="filter-completed">
          COMPLETED: {todos.filter((todo) => todo.checked).length}
        </button>
        <button className="filter-pending">
          PENDING: {todos.filter((todo) => !todo.checked).length}
        </button>
      </div>
      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((todo) => (
            <Todo
              todo={todo}
              onDelete={() => removeTodo(todo._id)}
              onToggle={() => toggleTodoState(todo)}
              key={todo._id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
