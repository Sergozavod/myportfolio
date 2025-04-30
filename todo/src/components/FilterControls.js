import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import styled from 'styled-components';

const FilterControls = () => {
  const { filter, setFilter } = useContext(TodoContext);

  return (
    <FilterContainer className="card fade-in">
      <FilterButton 
        $active={filter === 'all'} 
        onClick={() => setFilter('all')}
      >
        <FilterIcon $active={filter === 'all'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </FilterIcon>
        Все
      </FilterButton>
      <FilterButton 
        $active={filter === 'active'} 
        onClick={() => setFilter('active')}
      >
        <FilterIcon $active={filter === 'active'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </FilterIcon>
        Активные
      </FilterButton>
      <FilterButton 
        $active={filter === 'completed'} 
        onClick={() => setFilter('completed')}
      >
        <FilterIcon $active={filter === 'completed'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </FilterIcon>
        Завершенные
      </FilterButton>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  gap: 5px;
  padding: 15px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border: none;
  border-radius: var(--border-radius);
  background: ${props => props.$active ? 'var(--primary)' : 'white'};
  color: ${props => props.$active ? 'white' : 'var(--gray)'};
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: ${props => props.$active ? 'var(--primary)' : '#f1f3f5'};
  }
`;

const FilterIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? 'white' : 'var(--gray)'};
`;

export default FilterControls;