import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TodoItem = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim()) {
      updateTodo(todo.id, { text: editText });
      setIsEditing(false);
    }
  };

  return (
    <ItemContainer
      as={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      $completed={todo.completed}
      $important={todo.important}
    >
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
      />
      
      {isEditing ? (
        <EditInput
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
          autoFocus
        />
      ) : (
        <TodoContent onClick={() => setIsEditing(true)}>
          <TodoText $completed={todo.completed}>
            {todo.text}
          </TodoText>
          {todo.important && (
            <PriorityBadge>Важно</PriorityBadge>
          )}
        </TodoContent>
      )}
      
      <DeleteButton
        onClick={() => deleteTodo(todo.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </DeleteButton>
    </ItemContainer>
  );
};


const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
  border-left: 4px solid ${props => 
    props.$important ? 'var(--danger)' : 
    props.$completed ? 'var(--success)' : 'transparent'};
  opacity: ${props => props.$completed ? 0.8 : 1};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray);
  border-radius: 6px;
  margin-right: 15px;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  
  &:checked {
    background: var(--success);
    border-color: var(--success);
    
    &::after {
      content: '✓';
      position: absolute;
      color: white;
      font-size: 14px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const TodoContent = styled.div`
  flex: 1;
  cursor: pointer;
`;

const TodoText = styled.span`
  display: block;
  position: relative;
  color: ${props => props.$completed ? 'var(--gray)' : 'var(--dark)'};
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.$completed ? '100%' : '0'};
    height: 1px;
    background: var(--gray);
    transition: width 0.3s ease;
  }
`;

const PriorityBadge = styled.span`
  display: inline-block;
  margin-left: 10px;
  padding: 2px 8px;
  background: var(--danger);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--gray);
  border-radius: 6px;
  font-size: 16px;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }
`;

const DeleteButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
  transition: var(--transition);
  
  &:hover {
    color: var(--danger);
  }
`;

export default TodoItem;