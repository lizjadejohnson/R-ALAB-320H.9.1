import React from 'react';
import TodoEntry from './TodoEntry.jsx';

// TodoContainer component: Receives the list of todos and the dispatch function as props
const TodoContainer = ({ todos, dispatch }) => {
  return (
    <div>
      {/* Map through the todos array and render a TodoEntry component for each todo item */}
      {todos.map(todo => (
        <TodoEntry
          key={todo.id} // Unique key for each todo item to help React identify which items have changed
          todo={todo} // Pass the todo item as a prop to TodoEntry
          dispatch={dispatch} // Pass the dispatch function as a prop to TodoEntry
        />
      ))}
    </div>
  );
};

export default TodoContainer;
