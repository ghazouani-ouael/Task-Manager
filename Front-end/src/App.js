import React from 'react';
import './App.css'; 
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title-container">
              <div className="container-fluid">
                
      <div className="row">
        {/* Top Sidebar */}
        <div className="col-12 bg-primary text-light py-3 fixed-top">
          <h2 className="text-center">Task Manager</h2>
        </div>
      </div>
      </div>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <TaskList />
        </div>
      </main>
      <footer className="footer">
        <div className="container">
        </div>
        
      </footer>
    </div>
  );
}

export default App;