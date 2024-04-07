import React from 'react';
import styled from 'styled-components';

type Props = {
  // date: string;
  clientName: string;
  description: string;
  category: string;
  isRead: boolean;
  onClick: () => void;
};

const NotificationList = ({ onClick, isRead, clientName, description, category }: Props) => {
  return (
    <Container onClick={onClick} isRead={isRead}>
      <ContentWrapper>
        <TitleWrapper>
          <div>새로운 의뢰가 등록됐어요.</div>
          <div>{isRead ? <IsReaded>읽음</IsReaded> : <IsNotReaded>안읽음</IsNotReaded>}</div>
        </TitleWrapper>
        <DetailWrapper>
          <div>
            <h2>{clientName}</h2>
          </div>
          <div>
            <h3>{description}</h3>
            <h4>{category}</h4>
          </div>
        </DetailWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default NotificationList;

const Container = styled.div<{ isRead: boolean }>`
  display: flex;

  padding: 20px 30px;
  width: 439px;
  height: 120px;

  box-sizing: border-box;
  border-radius: 5px;
  background-color: ${(props) => (props.isRead ? '#e8e8e8' : '#fff6e3')};
  h2 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: #323232;
    margin-right: 21px;
  }
  h3 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: #323232;
  }
  h4 {
    font-family: 'pretendrad-regular';
    font-size: 15px;
    margin-top: 3px;
  }
  cursor: pointer;
  &:hover {
    background-color: #fffef1;
    transition: all ease-in-out 300ms;
  }
`;
const TitleWrapper = styled.div`
  width: 380px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'pretendard-semibold';
  font-size: 20px;
  margin-bottom: 17px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IsReaded = styled.div`
  font-size: 16px;
  font-family: 'pretendard-regular';
`;
const IsNotReaded = styled.div`
  font-size: 16px;
  font-family: 'pretendard-regular';
`;
