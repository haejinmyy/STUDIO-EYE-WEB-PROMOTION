import { getRequestsData } from '@/apis/PromotionAdmin/request';
import { IRequest } from '@/types/PromotionAdmin/request';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useState } from 'react';
import Pagination from '../../../components/PromotionAdmin/FAQ/Pagination';
import { PA_ROUTES } from '@/constants/routerConstants';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WaitingRequestsList from '@/components/PromotionAdmin/Home/RequestSummary/WaitingRequestsList';
import { ContentBox } from '@/components/PromotionAdmin/Request/Components';

function RequestList() {
  const { data, isLoading } = useQuery<IRequest[]>('requests', getRequestsData);
  console.log(data);

  const navigator = useNavigate();

  // pagination 구현에 사용되는 변수
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const [modalVisible, setModalVisible] = useState(false);
  const [showWaitingApproval, setShowWaitingApproval] = useState(false);
  const [showCompletedRequest, setShowCompletedRequest] = useState(false);

  const handleWaitingToggle = () => {
    setShowWaitingApproval(!showWaitingApproval);
    if (!showWaitingApproval) {
      setShowCompletedRequest(false);
    }
  };

  const handleCompletedToggle = () => {
    setShowCompletedRequest(!showCompletedRequest);
    if (!showCompletedRequest) {
      setShowWaitingApproval(false);
    }
  };

  return (
    <Wrapper>
      <ContentBox>
        {!data || data.length === 0 ? (
          <> 😊 의뢰 데이터가 존재하지 않습니다.</>
        ) : (
          <>
            <TitleWrapper>
              <Title>
                Request 관리
                <Info>총 {data.length}건</Info>
              </Title>
            </TitleWrapper>
            <TableWrapper>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : data && data.length > 0 ? (
                data.map((request) => {
                  return (
                    <RequestWrapper key={request.id}>
                      <StateText requestState={request.state}>
                        {request.state === 'DISCUSSING' ? '논의' :
                          (request.state === 'APPROVED' ? '승인' :
                            (request.state === 'REJECTED' ? '거절' : '대기')
                          )}
                      </StateText>
                      <WaitingRequestsList
                        organization={request.organization}
                        clientName={request.clientName}
                        description={request.description}
                        category={request.category}
                        date={`${request.year}년 ${request.month.toString().padStart(2, '0')}월`}
                        email={request.email}
                        requestId={request.id.toString()}
                      />
                    </RequestWrapper>
                  );
                })
              ) : (
                <h1>😊 대기 중인 의뢰가 없습니다.</h1>
              )}
            </TableWrapper>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={data.length}
              paginate={setCurrentPage}
            />
          </>
        )}
      </ContentBox>
      <Outlet />
    </Wrapper>
  );
}

export default RequestList;

const Wrapper = styled.div`
  padding: 1rem;
  font-family: 'pretendard';
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-size: 1.3rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 1rem;
  padding-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StateText = styled.div<{ requestState: string }>`
  color: ${(props) =>
    props.requestState === 'WAITING' ? 'black' : 'gray'};
  font-weight: bold;
  margin: 0 1rem;
`;

const RequestWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.05);
  &:hover {
    cursor: pointer;
    background-color: #afafaf;
    transition: all ease-in-out 200ms;
  }
`;