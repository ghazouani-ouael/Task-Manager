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
    <div className="card mb-3">
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <h5 className="card-title">{title}</h5>
            <p className="card-text mb-2">{description}</p>
            <span className={`badge ${completed ? 'badge-success' : 'badge-danger'}`}>
              {completed ? 'Complete' : 'Incomplete'}
            </span>
          </>
        )}
        <div className="task-actions">
          {isEditing ? (
            <button className="btn btn-success mr-2" onClick={handleSave}>Save</button>
          ) : (
            <>
           <button className="btn btn-outline-warning btn-sm mr-2" onClick={handleComplete}>
                {completed ? 'Mark as Incomplete' : 'Mark as Completed'}
              </button>
              <button className="btn btn-outline-primary btn-sm mr-2" onClick={() => onEdit(id)}>Edit</button>
              <button type="button" class="btn btn-outline-danger btn-sm mr-2" onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;