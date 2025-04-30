import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const UserSelection = () => {
  const { 
    users, 
    currentUser, 
    setCurrentUser, 
    addUser, 
    deleteTodo,
    setUsers
  } = useContext(TodoContext);
  
  const [newUserName, setNewUserName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUserName.trim()) {
      addUser(newUserName);
      setNewUserName('');
      setShowAddForm(false);
    }
  };

  const handleDeleteUser = (userId, e) => {
    e.stopPropagation();
    if (window.confirm('Удалить этого пользователя и все его задачи?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      deleteTodo(userId, true);
    }
  };

  return (
    <UserContainer className="card fade-in">
      <Title>Выберите пользователя</Title>
      <UserGrid>
        {users.map(user => (
          <UserCard
            key={user.id}
            $active={currentUser === user.id}
            onClick={() => setCurrentUser(user.id)}
          >
            <UserAvatar>
              {user.name.charAt(0).toUpperCase()}
            </UserAvatar>
            <UserName>{user.name}</UserName>
            <DeleteUserButton 
              onClick={(e) => handleDeleteUser(user.id, e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </DeleteUserButton>
          </UserCard>
        ))}
        
        {showAddForm ? (
          <AddUserForm onSubmit={handleAddUser}>
            <Input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Введите имя"
              autoFocus
            />
            <ButtonGroup>
              <Button type="submit" $variant="primary">Добавить</Button>
              <Button 
                type="button" 
                $variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Отмена
              </Button>
            </ButtonGroup>
          </AddUserForm>
        ) : (
          <AddUserButton onClick={() => setShowAddForm(true)}>
            <PlusIcon>+</PlusIcon>
            Новый пользователь
          </AddUserButton>
        )}
      </UserGrid>
    </UserContainer>
  );
};


const DeleteUserButton = styled(motion.button)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(247, 37, 133, 0.1);
  border: none;
  border-radius: 50%;
  color: var(--danger);
  cursor: pointer;
  opacity: 0;
  transition: var(--transition);
  
  &:hover {
    background: rgba(247, 37, 133, 0.2);
  }
`;

const UserCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px 15px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  background: ${props => props.$active ? 'rgba(67, 97, 238, 0.1)' : 'white'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : '#eee'};

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow);
    
    ${DeleteUserButton} {
      opacity: 1;
    }
  }
`;


const UserContainer = styled.div`
  padding: 25px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: var(--dark);
  font-weight: 600;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
`;


const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const UserName = styled.span`
  font-size: 14px;
  text-align: center;
  font-weight: 500;
`;

const AddUserButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: 2px dashed var(--gray);
  border-radius: var(--border-radius);
  background: transparent;
  cursor: pointer;
  transition: var(--transition);
  color: var(--gray);

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: rgba(67, 97, 238, 0.05);
  }
`;

const PlusIcon = styled.span`
  font-size: 24px;
  margin-bottom: 5px;
`;

const AddUserForm = styled.form`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px 15px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  background: ${props => 
    props.$variant === 'primary' ? 'var(--primary)' : 'transparent'};
  color: ${props => 
    props.$variant === 'primary' ? 'white' : 'var(--primary)'};
  border: ${props => 
    props.$variant === 'outline' ? '1px solid var(--primary)' : 'none'};

  &:hover {
    background: ${props => 
      props.$variant === 'primary' ? 'var(--primary-light)' : 'rgba(67, 97, 238, 0.1)'};
  }
`;

export default UserSelection;