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
            <div className="completion-icon">
              <span className={`badge ${completed ? 'badge-success' : 'badge-danger'}`}>
                {completed ? 'Complete' : 'Incomplete'}
              </span>
            </div>
          </>
        )}
        <div className="task-actions">
          {isEditing ? (
            <i
              className="bi bi-check-circle text-success mr-2"
              style={{ cursor: 'pointer' }}
              onClick={handleSave}
              title="Save"
            ></i>
          ) : (
            <>
              <i
                className={`bi ${completed ? 'bi-arrow-counterclockwise text-warning' : 'bi-check-circle text-success'} mr-2`}
                style={{ cursor: 'pointer' }}
                onClick={handleComplete}
                title={completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              ></i>
              <i
                className="bi bi-pencil text-primary mr-2"
                style={{ cursor: 'pointer' }}
                onClick={() => onEdit(id)}
                title="Edit"
              ></i>
              <i
                className="bi bi-trash text-danger"
                style={{ cursor: 'pointer' }}
                onClick={handleDelete}
                title="Delete"
              ></i>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;