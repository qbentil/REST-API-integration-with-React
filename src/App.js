import './App.css'

import React from 'react'

// import {render} from 'react-dom'

let id = 0;

const Todo = props => {
  <li>
    <input type="checkbox" />
    <button  title = "Delete" onClick = { props.onDelete}>Delete</button>
    <span>{props.todo.text}</span>
  </li>
}

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
        todos: this.state.todos.map(todo => {
          if (todo.id !== id)
            return todo;
          return {
            id: todo.id,
            text: todo.text,
            checked: !todo.checked,
          };
        })
      });
    }
    render()
    {
      return (
        <div>
          <button onClick={this.addTodo}>Add TODO</button>
        </div>
      );
    }
}

export default App;
