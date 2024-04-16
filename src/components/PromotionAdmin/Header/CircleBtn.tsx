import React from 'react';
import styled from 'styled-components';

type Props = {
  id: string;
  defaultIcon: string;
  isNewIcon?: string; // noti only
  iconStatus?: boolean; // noti only, true-새로운 알림이 있는 상태, false-새로운 알림이 없는 상태
  isNotiOpened: boolean;
  setIsNotiOpened: (isNotiOpened: boolean) => void;
};

const CircleBtn = ({ id, defaultIcon, isNewIcon, iconStatus, isNotiOpened, setIsNotiOpened }: Props) => {
  return (
    <Container>
      {id === 'notification' ? (
        <NotiButton onClick={() => setIsNotiOpened(!isNotiOpened)}>
          <img src={iconStatus ? isNewIcon : defaultIcon} alt='noti icon' />
        </NotiButton>
      ) : (
        <img src={defaultIcon} alt='user icon' />
      )}
    </Container>
  );
};

export default CircleBtn;

const Container = styled.div`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  background-color: #e2e2e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  &:hover {
    background-color: #ffefcf;
  }
  transition: all ease-in-out 300ms;
`;

const NotiButton = styled.button`
  border: none;
  background-color: inherit;
`;
