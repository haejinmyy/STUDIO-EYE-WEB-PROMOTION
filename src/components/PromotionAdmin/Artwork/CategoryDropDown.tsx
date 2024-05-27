import { CATEGORIES } from '@/constants/categories';
import React, { useState } from 'react';
import styled from 'styled-components';

interface CategoryDropDownProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryDropDown = ({ setSelectedCategory }: CategoryDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategoryLocal] = useState('All');

  const handleCategorySelect = (category: string) => {
    setSelectedCategoryLocal(category);
    setSelectedCategory(category === 'All' ? '' : category);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <CategoryButton onClick={() => setIsOpen(!isOpen)}>
        {selectedCategory}
        {isOpen ? <DropdownIcon>&#9650;</DropdownIcon> : <DropdownIcon>&#9660;</DropdownIcon>}
      </CategoryButton>
      {isOpen && (
        <Dropdown>
          {['All', ...CATEGORIES].map((category, index) => (
            <CategoryItem key={index} onClick={() => handleCategorySelect(category)}>
              {category}
            </CategoryItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};
export default CategoryDropDown;

const Wrapper = styled.div`
  position: relative;
  height: 30px;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  z-index: 90;
`;

const CategoryButton = styled.button`
  font-size: 15px;
  font-family: 'pretendard-medium';
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const DropdownIcon = styled.span``;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border-top: none;
  border-radius: 0 0 5px 5px;
  background-color: #ffffffa6;
  backdrop-filter: blur(5px);
`;

const CategoryItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-family: 'pretendard-light';
  &:hover {
    background-color: #f1f1f1;
    transition: all 300ms ease-in-out;
  }
`;
