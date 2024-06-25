import React from 'react';
import './App.css'; 
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title-container">
          <h1 className="app-title">Task Manager</h1>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <TaskList />
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Task Manager App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;