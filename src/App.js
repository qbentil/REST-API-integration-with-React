import './App.css'

import React from 'react'

// import {render} from 'react-dom'

let id = 0;

const Todo = props => (
    <div className = {props.todo.checked? "todo completed": "todo"}>
        <li className = "todo-item"> {props.todo.text}</li>
        <button className='completed-btn' onClick={props.onToggle}><i className = "fas fa-check"> </i></button>
        <button  title = "Delete" onClick = { props.onDelete} className='trash-btn'><i className = "fas fa-trash"> </i></button>
    </div>
)

class App extends React.Component{
    constructor()
    {
      super();
      this.state = {
        todos: [],
        text: '',
      };
    }

    // add TODO
    addTodo()
    {

      if(this.state.text !== "")
      {
        this.setState({
          todos: [
            ...this.state.todos, { id: id++, text: this.state.text, checked: false }
          ],
          text: ''
        });

        
      }

      
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
            <header>
                <h1>Bentil's To Do List</h1>
            </header>

            <div className='form'>
                <input 
                    type="text" 
                    name = "text" 
                    class="todo-input" 
                    value = {this.state.text}
                    onChange = {(text) => this.setState({[text.target.name]: text.target.value})}
                />
                <button class="todo-button" onClick={() => this.addTodo()}>
                    <i class="fas fa-plus-square"></i>
                </button>
            </div>

            <div class="filter">
                <button class="filter-all">ALL: {this.state.todos.length}</button>
                <button class="filter-completed" >COMPLETED: {this.state.todos.filter(todo => todo.checked).length}</button>
                <button class="filter-pending" >PENDING: {this.state.todos.filter(todo => !todo.checked).length}</button>
            </div>
            <div className = "todo-container">
                <ul className="todo-list">
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
        </div>
      );
    }
}

export default App;
