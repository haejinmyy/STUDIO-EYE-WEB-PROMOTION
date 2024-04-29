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
  text-decoration: none;
`;

const Name = styled.div`
  font-size: 70px;
  color: white;
  font-family: 'pretendard-bold';
`;
