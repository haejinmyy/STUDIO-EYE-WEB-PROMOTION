import { getRequestsData } from '@/apis/PromotionAdmin/request';
import { IRequest } from '@/types/PromotionAdmin/request';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useState } from 'react';
import Pagination from '../../../components/PromotionAdmin/FAQ/Pagination';
import { PA_ROUTES } from '@/constants/routerConstants';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import WaitingRequestsList from '@/components/PromotionAdmin/Home/RequestSummary/WaitingRequestsList';
import { ContentBox } from '@/components/PromotionAdmin/Request/Components';

function RequestList() {
  const { data, isLoading } = useQuery<IRequest[]>('requests', getRequestsData);
  console.log(data);

  // pagination 구현에 사용되는 변수
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const [showWaitingApproval, setShowWaitingApproval] = useState<boolean>(false);
  const [showCompletedRequest, setShowCompletedRequest] = useState<boolean>(false);

  const handleWaitingToggle = () => {
    setShowWaitingApproval(!showWaitingApproval);
    if (!showWaitingApproval) {
      setShowCompletedRequest(false);
    }
  };

  const filterWaitingRequests = (requests: IRequest[]): IRequest[] => {
    return requests.filter((request) => request.state === 'WAITING');
  };
  
  const filteredRequests = showWaitingApproval ? filterWaitingRequests(data || []) : data;

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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ToggleLabel>
                  {showWaitingApproval ? '대기 중인 의뢰' : '전체 의뢰'}
                </ToggleLabel>
                <ToggleButton onClick={handleWaitingToggle}>
                  <ToggleSlider active={showWaitingApproval} />
                </ToggleButton>
              </div>
            </TitleWrapper>
            <TableWrapper>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : filteredRequests && filteredRequests.length > 0 ? (
                filteredRequests.map((request) => {
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

const ToggleButton = styled.div`
  position: relative;
  width: 60px;
  height: 34px;
`;

const ToggleSlider = styled.div<{ active: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.active ? '#4caf50' : '#ccc')};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) => (props.active ? 'translateX(26px)' : 'translateX(0)')};
  }
`;

const ToggleLabel = styled.span`
  margin-right: 1rem;
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
