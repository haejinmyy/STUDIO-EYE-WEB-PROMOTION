import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { dataUpdateState } from '@/recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type Props = {
  path: string;
  pathName: string;
  svgComponent: React.ReactNode;
};

const NavBtn = ({ path, pathName, svgComponent}: Props) => {
  const isUpdate = useRecoilValue(dataUpdateState);
  const setupdate = useSetRecoilState(dataUpdateState);

  const updateHandler=(event:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
    if (isUpdate&&!window.confirm("페이지를 떠나시겠습니까?")) {
      event.preventDefault();
    }
    setupdate(false);
  }

  return (

    <LinkStyle to={path} onClick={updateHandler}>
      <SvgContainer>{svgComponent}</SvgContainer>
      <Name>{pathName}</Name>
    </LinkStyle>
  );
};

export default NavBtn;

const LinkStyle = styled(NavLink)`
  width: 127px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #595959;
  text-decoration: none;
  &:hover,
  &.active {
    color: #ffa900;
    background-color: #f1f1f3;
    svg {
      stroke: #ffa900;
      transition: all ease-in-out 300ms;
    }
  }
  transition: all ease-in-out 300ms;
`;

const SvgContainer = styled.div`
  object-fit: contain;
  stroke: #595959;
`;

const Name = styled.div`
  margin-top: 5px;
  font-family: 'pretendard-semibold';
  font-size: 14px;
`;
