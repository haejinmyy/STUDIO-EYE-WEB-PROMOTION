import React from 'react';
import { ReactComponent as LogoutSvg } from '@/assets/images/PA-Navigation/logout.svg';
import styled from 'styled-components';

const Logout = () => {
  const logout = () => {
    if (window.confirm('로그아웃하시겠습니끼?')) {
      localStorage.removeItem('recoil-persist');
      window.location.reload();
    }
  };
  return (
    <Container onClick={logout}>
      <LogoutSvg width={15} height={15} />
      <span>Logout</span>
    </Container>
  );
};

export default Logout;

const Container = styled.button`
  width: 100%;
  height: fit-content;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  svg {
    object-fit: contain;
    stroke: #595959;
    margin-right: 5px;
  }
  padding-top: 15px;
  padding-bottom: 15px;
  border-top: 0.5px solid #979797;
  color: #595959;
  font-family: 'pretendard-semibold';
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
