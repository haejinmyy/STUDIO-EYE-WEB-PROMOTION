import React from 'react'
import styled from 'styled-components';

type Props = {
    defaultIcon: string;
    isNewIcon: string;
    iconStatus?: boolean; // true-새로운 알림이 있는 상태, false-새로운 알림이 없는 상태
}

const CircleBtn = ({defaultIcon, isNewIcon, iconStatus}:Props) => {
  return (
    <Container>
          <img src={iconStatus ? isNewIcon : defaultIcon} alt="icon" />
    </Container>
  )
}

export default CircleBtn

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
        width: 35.5px;
        height: 30px;
        object-fit: contain;
    }
`;