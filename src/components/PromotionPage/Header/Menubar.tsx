import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ppHeaderState } from '@/recoil/atoms';

const Menubar = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(ppHeaderState);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ToggleContainer className={isMenuOpen ? 'active' : ''} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </ToggleContainer>
  );
};

export default Menubar;

const ToggleContainer = styled.div`
  display: block;
  cursor: pointer;
  z-index: 150;
  transform: translate(-50%, -50%);
  margin-top: 25px;

  span {
    display: block;
    background: #fff;
    width: 42px;
    height: 4px;
    border-radius: 3px;
    transition:
      0.25s margin 0.25s,
      0.25s transform;
  }

  span:nth-child(1) {
    margin-bottom: 8px;
  }

  span:nth-child(3) {
    margin-top: 8px;
  }

  &.active span:nth-child(1) {
    margin-top: 8px;
    margin-bottom: -4px;
    transform: rotate(45deg);
  }

  &.active span:nth-child(2) {
    transform: rotate(45deg);
  }

  &.active span:nth-child(3) {
    margin-top: -4px;
    transform: rotate(135deg);
  }
`;
