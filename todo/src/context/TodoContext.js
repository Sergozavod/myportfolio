import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('todo-users');
    return saved ? JSON.parse(saved) : [];
  });
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todo-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');

  
  useEffect(() => {
    localStorage.setItem('todo-users', JSON.stringify(users));
    if (users.length > 0 && !currentUser) {
      setCurrentUser(users[0].id);
    }
  }, [users, currentUser]);

  
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(todos));
  }, [todos]);

  
  const getFilteredTodos = () => {
    if (!currentUser) return [];
    return todos
      .filter(todo => todo.userId === currentUser)
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      });
  };

  
  const addUser = (name) => {
    const newUser = { id: Date.now(), name };
    setUsers(prev => [...prev, newUser]);
    return newUser.id;
  };

  const addTodo = (text, important = false) => {
    if (!currentUser || !text.trim()) return;
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false,
      important,
      userId: currentUser,
      createdAt: new Date().toISOString()
    }]);
  };

  const updateTodo = (id, updates) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{
      currentUser,
      users,
      todos: getFilteredTodos(),
      filter,
      setFilter,
      addUser,
      setCurrentUser,
      setUsers,
      addTodo,
      updateTodo,
      deleteTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};