import React, { useReducer, useState } from 'react';
import './App.css';
import todoData from './assets/todoData.js';
import TodoContainer from './components/TodoContainer.jsx';

// Initial state for the todos, imported from todoData.js
const initialState = todoData;

// Reducer function to handle todo actions
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // Add a new todo item to the beginning of the state array
      return [action.newTodo, ...state];
    case 'TOGGLE_COMPLETE':
      // Toggle the 'completed' status of a todo item
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      // Remove a todo item from the state array
      return state.filter(todo => todo.id !== action.id);
    case 'EDIT_TODO':
      // Update the title of a todo item
      return state.map(todo =>
        todo.id === action.id ? { ...todo, title: action.newTitle } : todo
      );
    default:
      // Return the current state if the action type doesn't match any case
      return state;
  }
};

function App() {
  // useReducer hook to manage the todos state with the todoReducer function
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  // useState hook to manage the input state for a new todo item
  const [newTodo, setNewTodo] = useState('');

  // Function to handle adding a new todo
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim()) {
      // Create a new todo item
      const newTodoItem = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };
      // Dispatch an action to add the new todo item to the state
      dispatch({ type: 'ADD_TODO', newTodo: newTodoItem });
      // Clear the input field
      setNewTodo('');
    }
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      {/* Form to add new todos */}
      <form onSubmit={handleAddTodo}>
        {/* Input field for the new todo title */}
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        {/* Button to submit the new todo */}
        <button type="submit">Add Todo</button>
      </form>
      {/* Render the TodoContainer component, passing down the todos state and dispatch function as props */}
      <TodoContainer todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default App;
