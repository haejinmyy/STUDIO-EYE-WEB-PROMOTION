import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
  pathName: string;
};

const NavBtn = ({ path, pathName }: Props) => {
  return (
    <LinkStyle to={path}>
      <Name>{pathName}</Name>
    </LinkStyle>
  );
};

export default NavBtn;

const LinkStyle = styled(NavLink)`
  width: 127px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #595959;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.symbol};
  }

  &.active {
    border-bottom: 2.5px solid ${(props) => props.theme.color.symbol};
  }
`;

const Name = styled.div`
  margin-top: 5px;
  font-family: 'pretendard-semibold';
  font-size: 14px;
`;
