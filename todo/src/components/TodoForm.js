import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import styled from 'styled-components';

const TodoForm = () => {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState('');
  const [important, setImportant] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, important);
      setText('');
      setImportant(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} className="card fade-in">
      <InputGroup>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавьте новую задачу..."
        />
        <Actions>
          <PriorityButton 
            type="button"
            $active={important}
            onClick={() => setImportant(!important)}
            title="Пометить как важное"
          >
            <PriorityIcon $active={important}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17V7M12 7L7 12M12 7L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </PriorityIcon>
            {important ? 'Важно!' : 'Важно?'}
          </PriorityButton>
          <SubmitButton type="submit">
            Добавить
          </SubmitButton>
        </Actions>
      </InputGroup>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  margin-bottom: 25px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  font-size: 16px;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const PriorityButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 15px;
  height: 48px;
  border-radius: var(--border-radius);
  border: none;
  background: ${props => props.$active ? 'var(--danger)' : 'var(--light)'};
  color: ${props => props.$active ? 'white' : 'var(--gray)'};
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: ${props => props.$active ? 'var(--danger)' : '#e9ecef'};
  }
`;

const PriorityIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${props => props.$active ? 'white' : 'var(--danger)'};
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 0 20px;
  height: 48px;
  border: none;
  border-radius: var(--border-radius);
  background: var(--primary);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-light);
  }
`;

export default TodoForm;