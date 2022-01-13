import './App.css'

import React from 'react'

// import {render} from 'react-dom'

let id = 0;

const Todo = props => (
  <li>
    <input type="checkbox" checked = {props.todo.checked}  onChange={props.onToggle}/>
    <span>{props.todo.text}</span>
    <button  title = "Delete" onClick = { props.onDelete}>Delete</button>
  </li>
)

class App extends React.Component{
    constructor()
    {
      super();
      this.state = {
        todos: [],
      };
    }

    // add TODO
    addTodo()
    {
      const text = prompt("TODO text please....");
      this.setState({
        todos: [
          ...this.state.todos, { id: id++, text: text, checked: false }
        ]
      });
    }

    // remove TODO
    removeTodo(id){
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id)
      });
    }
    // Handle checked todo
    toggleTodoState(id)
    {
      this.setState({
        todos: this.state.todos.map(todo => {
          if (todo.id !== id) return todo;
          return {
            id: todo.id,
            text: todo.text,
            checked: !todo.checked,
          };
        })
      })
    }
    render()
    {
      return (
        <div>
          <div>TODO Count: {this.state.todos.length}</div>
          <div>Unchecked TODO Count: {this.state.todos.filter(todo => !todo.checked).length}</div>
          <button onClick={() => this.addTodo()}>Add TODO</button>
          <ul>
            {this.state.todos.map( todo => (
               <Todo
                todo = {todo}
                onDelete = {() => this.removeTodo(todo.id)} 
                onToggle = {() => this.toggleTodoState(todo.id)}
                key = {todo.id} 
               />
            ))}
          </ul>
        </div>
      );
    }
}

export default App;
