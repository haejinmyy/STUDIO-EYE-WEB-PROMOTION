import { PA_ROUTES } from '@/constants/routerConstants';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  clientName: string;
  description: string;
  category: string;
  isRead: boolean;
  onClick: () => void;
  onDelete: () => void;
  requestId: number;
};

const NotificationList = ({ requestId, onClick, onDelete, isRead, clientName, description, category }: Props) => {
  const slicedDescription = description && description.length > 20 ? `${description.slice(0, 20)}...` : description;

  return (
    <>
      <Container to={`${PA_ROUTES.REQUEST}/${requestId}`} onClick={onClick} isRead={isRead}>
        <ContentWrapper>
          <TitleWrapper>
            <ClientWrapper>
              <span>{clientName}</span>님께서 새로운 의뢰를 등록했어요.
            </ClientWrapper>
            <div>{isRead ? <IsReaded>읽음</IsReaded> : <IsNotReaded>안읽음</IsNotReaded>}</div>
          </TitleWrapper>
          <DetailWrapper>
            <div>
              <h3>{slicedDescription}</h3>
              <h4>{category}</h4>
            </div>
          </DetailWrapper>
        </ContentWrapper>
      </Container>
      <DeleteWrapper onClick={onDelete}>삭제하기</DeleteWrapper>
    </>
  );
};

export default NotificationList;

const Container = styled(Link)<{ isRead: boolean }>`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 30px;
  width: 439px;
  height: 120px;
  z-index: 100;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: ${(props) => (props.isRead ? '#f3f3f388' : '#fff2d682')};
  h2 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: #323232;
    margin-right: 21px;
  }
  h3 {
    font-family: 'pretendard-semibold';
    font-size: 20px;
    color: #323232;
  }
  h4 {
    font-family: 'pretendrad-regular';
    font-size: 15px;
    margin-top: 5px;
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
  align-items: start;
  justify-content: space-between;
  font-family: 'pretendard-regular';
  font-size: 17px;
`;

const ClientWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
  span {
    font-size: 17px;
    font-family: 'pretendard-semibold';
    color: black;
  }
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

const DeleteWrapper = styled.div`
  text-align: right;
  padding: 5px;
  font-family: 'pretendard-semibold';
  font-size: 15px;
  cursor: pointer;
  &:hover {
    color: #ff3636;
    transition: all ease-in-out 300ms;
  }
`;
