import React from "react";
import ReactDOM from "react-dom";
import "./styles.css"

let id = 0

const Todo = props => (
  <li>
    <input type="checkbox" checked={props.todo.checked} onChange={props.onToggle}/>
    <span>{props.todo.text}</span>
    <button onClick={props.onDelete}>Delete</button>
  </li>
)

class App extends React.Component{
   constructor(props){
     super()
     this.state={
       todos: [],
       value: '',
     }
   }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  toggleTodo(id){
    this.setState({
      todos: this.state.todos.map(todo =>{
        if(todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        }
      })
    })
  }

  addTodo(event){
     const text = this.state.value
     this.setState({
       todos: [...this.state.todos, {id: id++, text: text, checked: false}],
       value: '',
     })
     event.preventDefault();
  }

  removeTodo(id){
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !==id)
    })
  }

  render(){
    return(
      <div>
        <div>Todo Count: {this.state.todos.length}</div>
        <div>Unchecked Count: {this.state.todos.filter(todo => !todo.checked).length}</div>
        Text:  <input type="text" value={this.state.value} onChange={(event) => this.handleChange(event)} />
        <button onClick={() => this.addTodo()}>Add Todo</button> 
        <ul>
          {this.state.todos.map( todo => (
          <Todo
          onToggle={() => this.toggleTodo(todo.id)}
          onDelete={() => this.removeTodo(todo.id)} 
          todo={todo}/>
          ))}
        </ul>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement)