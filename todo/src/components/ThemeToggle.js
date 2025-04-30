import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TodoContext } from '../context/TodoContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(TodoContext);

  return (
    <ToggleContainer onClick={toggleTheme}>
      <ToggleTrack darkMode={darkMode}>
        <ToggleThumb 
          darkMode={darkMode}
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        />
      </ToggleTrack>
      <ToggleIcon darkMode={darkMode}>
        {darkMode ? '🌙' : '☀️'}
      </ToggleIcon>
    </ToggleContainer>
  );
};

// Стилизованные компоненты
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ToggleTrack = styled.div`
  width: 40px;
  height: 20px;
  background: ${props => props.darkMode ? '#4a6fa5' : '#ccc'};
  border-radius: 10px;
  position: relative;
  padding: 2px;
`;

const ToggleThumb = styled(motion.div)`
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: ${props => props.darkMode ? '22px' : '2px'};
`;

const ToggleIcon = styled.span`
  font-size: 1.2em;
`;

export default ThemeToggle;