import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import FilterControls from './FilterControls';

const TodoDashboard = () => {
  const { currentUser, users, todos } = useContext(TodoContext);
  
  if (!currentUser) return null;
  
  return (
    <div className="dashboard">
      <h2>Задачи для {users.find(u => u.id === currentUser)?.name}</h2>
      <TodoForm />
      <FilterControls />
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoDashboard;