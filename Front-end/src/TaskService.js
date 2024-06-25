const API_URL = 'http://localhost:8080/api/tasks';

const TaskService = {
  getAllTasks: () => {
    return fetch(API_URL)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching tasks:', error);
        throw error;
      });
  },

  createTask: (task) => {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error creating task:', error);
        throw error;
      });
  },

  updateTask: (id, updatedTask) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error updating task:', error);
        throw error;
      });
  },
 

  deleteTask: (id) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error deleting task:', error);
        throw error;
      });
  },
};

export default TaskService;