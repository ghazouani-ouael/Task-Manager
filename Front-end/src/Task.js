import React, { useState } from 'react';

const Task = ({ task, onDelete, onCompleteToggle, onEdit, onUpdate, isEditing }) => {
  const { id, title, description, completed } = task;
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleComplete = () => {
    onCompleteToggle(id, completed);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
    };
    onUpdate(updatedTask);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
        ) : (
          title
        )}
      </td>
      <td>
        {isEditing ? (
          <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
        ) : (
          description
        )}
      </td>
      <td>{completed ? (
          <span className="badge badge-success">Complete</span>
        ) : (
          <span className="badge badge-danger">Incomplete</span>
        )}</td>
      <td>
        {isEditing ? (
          <button onClick={handleSave} type="button" class="btn btn-outline-success">Save</button>
        ) : (
          <>
            <button type="button" class="btn btn-outline-warning" onClick={handleComplete}>
              {completed ? 'Not Completed' : 'Completed'}
            </button>
            <button type="button" class="btn btn-outline-info" onClick={() => onEdit(id)}>Edit</button>
            <button type="button" class="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default Task;