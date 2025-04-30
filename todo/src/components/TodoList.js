import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const TodoList = ({ filter, showImportantOnly }) => {
  const { todos } = useContext(TodoContext);
  
  const filteredTodos = todos.filter(todo => {
    // Фильтрация по статусу
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    
    // Фильтрация по важности
    if (showImportantOnly && !todo.important) return false;
    
    return true;
  });

  return (
    <ListContainer>
      {filteredTodos.length === 0 ? (
        <EmptyMessage>Нет задач</EmptyMessage>
      ) : (
        <AnimatePresence>
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </AnimatePresence>
      )}
    </ListContainer>
  );
};

// Стилизованные компоненты
const ListContainer = styled.div`
  margin-top: 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.completedText};
  padding: 20px;
`;

export default TodoList;