import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskService from './TaskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [editTask, setEditTask] = useState(null); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    TaskService.getAllTasks()
      .then(response => {
        setTasks(response);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      setErrorMessage('Title is required.');
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    TaskService.createTask(newTask)
      .then(() => {
        setNewTask({ title: '', description: '', completed: false });
        fetchTasks();
        setSuccessMessage('Task added successfully.');
        setTimeout(() => setSuccessMessage(''), 2000); 
      })
      .catch(error => {
        console.error('Error adding task:', error);
        setErrorMessage('Failed to add task. Please try again.');
      });
  };

  const handleDelete = (id) => {
    TaskService.deleteTask(id)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id)); 
        setSuccessMessage('Task deleted successfully.');
        setTimeout(() => setSuccessMessage(''), 2000); 
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        setErrorMessage('Failed to delete task. Please try again.');
        setTimeout(() => setErrorMessage(''), 2000); 
      });
  };

  const handleCompleteToggle = (id, completed) => {
    const updatedTask = { ...tasks.find(task => task.id === id), completed: !completed };
    TaskService.updateTask(id, updatedTask)
      .then(() => {
        fetchTasks();
        setSuccessMessage('Task updated successfully.');
        setTimeout(() => setSuccessMessage(''), 2000); 
      })
      .catch(error => {
        console.error('Error updating task:', error);
        setErrorMessage('Failed to update task. Please try again.');
        setTimeout(() => setErrorMessage(''), 2000); // Clear error message after 2 seconds
      });
  };

  const handleEdit = (id) => {

    const taskToEdit = tasks.find(task => task.id === id);
    setEditTask(taskToEdit);
  };

  const handleUpdateTask = (updatedTask) => {
 
    TaskService.updateTask(updatedTask.id, updatedTask)
      .then(() => {
        setEditTask(null); 
        fetchTasks();
        setSuccessMessage('Task updated successfully.');
        setTimeout(() => setSuccessMessage(''), 2000); 
      })
      .catch(error => {
        console.error('Error updating task:', error);
        setErrorMessage('Failed to update task. Please try again.');
        setTimeout(() => setErrorMessage(''), 2000); 
      });
  };

  return (
    <div className="App">

      <div className="task-form">
      <h2 className="task-title">Task Form</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <small id="title2" class="form-text text-muted">The Title is required !</small>
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        ></textarea>
        <button onClick={handleAddTask}>Add Task</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
      <div className="title-container">
        <h2 className="list-title">Tasks List</h2>
      </div>
      <div className="task-list">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onCompleteToggle={handleCompleteToggle}
                onEdit={handleEdit}
                onUpdate={handleUpdateTask}
                isEditing={editTask && editTask.id === task.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;