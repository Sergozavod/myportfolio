import React from 'react';
import { TodoProvider } from './context/TodoContext';
import UserSelection from './components/UserSelection';
import TodoDashboard from './components/TodoDashboard';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="app-container">
        <UserSelection />
        <TodoDashboard />
      </div>
    </TodoProvider>
  );
}

export default App;