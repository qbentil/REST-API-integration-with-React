import "./App.css";

import React, { useState } from "react";

let id = 0;
const Todo = (props) => {
  const { todo, onDelete, onToggle } = props;
  return (
    <div className={todo.checked ? "todo completed" : "todo"}>
      <li className="todo-item"> {todo.text}</li>
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

  // add TODO
  const addTodo = (e) => {
    e.preventDefault();

    // check if todo exist
    const todoExist = todos.find((todo) => todo.text === text);

    if (text !== "" && !todoExist) {
      setTodos([...todos, { id: id++, text: text, desc: desc, checked: false }]); // add todo
      setText(""); // clear input
      setDesc(""); // clear input
    }
  };

  // remove TODO
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // Handle checked todo
  const toggleTodoState = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }
        return todo;
      })
    );
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
          class="todo-input"
          value={text}
          placeholder="TODO Text"
          onChange={(e) => setText(e.target.value)}
        />
        <textarea
          value={desc}
          class="todo-input"
          name="text"
          placeholder="TODO Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button class="todo-button" onClick={addTodo}>
          <i class="fas fa-plus-square" /> ADD
        </button>
      </form>

      <div class="filter">
        <button class="filter-all">ALL: {todos.length}</button>
        <button class="filter-completed">
          COMPLETED: {todos.filter((todo) => todo.checked).length}
        </button>
        <button class="filter-pending">
          PENDING: {todos.filter((todo) => !todo.checked).length}
        </button>
      </div>
      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((todo) => (
            <Todo
              todo={todo}
              onDelete={() => removeTodo(todo.id)}
              onToggle={() => toggleTodoState(todo.id)}
              key={todo.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
