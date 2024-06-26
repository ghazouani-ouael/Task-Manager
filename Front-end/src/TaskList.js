import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskService from './TaskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [editTask, setEditTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

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
        setTimeout(() => setErrorMessage(''), 2000);
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

  const handleSelectTask = (e) => {
    const taskId = parseInt(e.target.value, 10);
    const task = tasks.find(task => task.id === taskId);
    setSelectedTask(task);
  };

  const handleCloseSelectedTask = () => {
    setSelectedTask(null);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Top Sidebar */}
        <div className="col-12  text-light py-3 fixed-top" style={{ backgroundColor: '#5e2f95' }}>
          <h2 className="text-left">Task Manager</h2>
        </div>
      </div>

      <div className="row">
        {/* Left Sidebar */}
        <div  className="col-1  text-light py-3 fixed-left"  style={{ backgroundColor: '#5e2f95' }} >
    
        </div>

        {/* Main Content Area */}
        <div className="col-9 offset-2">
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="card-title">Task Form</h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <textarea
                className="form-control mb-3"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              ></textarea>
              <button id="add-form" className="btn btn-primary mt-3" onClick={handleAddTask}>Add Task</button>
              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="card-title">Select Task by ID</h2>
              <select className="form-control mb-3" onChange={handleSelectTask}>
                <option value="">Select Task</option>
                {tasks.map(task => (
                  <option key={task.id} value={task.id}>{task.id}</option>
                ))}
              </select>
              {selectedTask && (
                <div className="mt-3">
                  <h3>Selected Task</h3>
                  <p>ID: {selectedTask.id}</p>
                  <p>Title: {selectedTask.title}</p>
                  <p>Description: {selectedTask.description}</p>
                  <p>Status: 
                    <span className={`badge ${selectedTask.completed ? 'badge-success' : 'badge-danger'}`}>
                      {selectedTask.completed ? 'Completed' : 'Incomplete'}
                    </span>
                  </p>
                  <button id="close-form" className="btn btn-secondary mt-3 btn-sm mr-2" onClick={handleCloseSelectedTask}>Close</button>
                </div>
              )}
            </div>
          </div>
          <h2 className="card-title">Task Cards</h2>
          <br></br>
          <div className="row">
            {tasks.map(task => (
              <div key={task.id} className="col-md-4">
                <Task
                  task={task}
                  onDelete={handleDelete}
                  onCompleteToggle={handleCompleteToggle}
                  onEdit={handleEdit}
                  onUpdate={handleUpdateTask}
                  isEditing={editTask && editTask.id === task.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;