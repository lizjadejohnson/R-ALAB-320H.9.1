import React, { useState } from 'react';

// TodoEntry component: Represents a single todo item and its associated actions
const TodoEntry = ({ todo, dispatch }) => {
  // Local state to manage the edit mode and the edited title
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // Function to toggle the 'completed' status of the todo item
  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_COMPLETE', id: todo.id });
  };

  // Function to delete the todo item
  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', id: todo.id });
  };

  // Function to enable edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save the edited title and disable edit mode
  const handleSave = () => {
    dispatch({ type: 'EDIT_TODO', id: todo.id, newTitle: editTitle });
    setIsEditing(false);
  };

  return (
    <div className="todo-entry">
      {/* Checkbox to toggle the 'completed' status */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        // Input field for editing the todo title
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      ) : (
        // Display the todo title
        <span>{todo.title}</span>
      )}
      {isEditing ? (
        // Button to save the edited title
        <button className="save" onClick={handleSave}>Save</button>
      ) : (
        // Buttons to enable edit mode and delete the todo
        <>
          <button className="edit" onClick={handleEdit}>Edit</button>
          <button className="delete" onClick={handleDelete} disabled={!todo.completed}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TodoEntry;
