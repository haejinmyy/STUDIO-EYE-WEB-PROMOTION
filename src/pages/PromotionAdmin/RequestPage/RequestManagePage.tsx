import { getRequestsData } from '@/apis/PromotionAdmin/request';
import { IRequest } from '@/types/PromotionAdmin/request';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import WaitingRequestsList from '@/components/PromotionAdmin/Home/RequestSummary/WaitingRequestsList';
import { ContentBox } from '@/components/PromotionAdmin/Request/Components';
import Pagination from '@/components/Pagination/Pagination';

function RequestList() {
  const { data, isLoading, refetch } = useQuery<IRequest[]>('requests', getRequestsData, { refetchOnWindowFocus: false });

  // pagination 구현에 사용되는 변수
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 페이지 변경 시 데이터 다시 불러오기
  useEffect(() => {
    refetch();
  }, [currentPage, postsPerPage]);

  //

  const [filterState, setFilterState] = useState<string>('ALL');

  const filterRequests = (requests: IRequest[], state: string): IRequest[] => {
    if (state === 'ALL') {
      return requests;
    }
    return requests.filter((request) => request.state === state);
  };

  const filteredRequests = filterRequests(data || [], filterState) || [];
  const slicedRequests = filteredRequests?.slice(indexOfFirst, indexOfLast) || [];

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>
          Request 관리
          <Info>총 {filteredRequests.length}건</Info>
        </Title>
        <DropDown onChange={(e) => {
          setFilterState(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="ALL">전체 문의</option>
          <option value="WAITING">대기 중인 문의</option>
          <option value="APPROVED">승인된 문의</option>
          <option value="REJECTED">거절된 문의</option>
          <option value="DISCUSSING">논의 중인 문의</option>
        </DropDown>
      </TitleWrapper>
      <ContentBox>
        {!data || data.length === 0 ? (
          <> 😊 문의 데이터가 존재하지 않습니다.</>
        ) : (
          <>
            <TableWrapper>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : slicedRequests && slicedRequests.length > 0 ? (
                slicedRequests.map((request) => {
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
                        hoverBackgroundColor={'transparent'}
                      />
                    </RequestWrapper>
                  );
                })
              ) : (
                <h1>대기 중인 문의가 없습니다.</h1>
              )}
            </TableWrapper>
            <PaginationWrapper>
              <Pagination postsPerPage={postsPerPage} totalPosts={filteredRequests.length} paginate={paginate} />
            </PaginationWrapper>
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
  padding: 0 0 2rem 0;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 1rem;
  padding-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const DropDown = styled.select`
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  padding: 0.4rem 1.4rem;
  margin: 1rem 0;

  border-radius: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;

  option {
    padding: 10px;
  }
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StateText = styled.div<{ requestState: string }>`
  color: ${(props) =>
    props.requestState === 'WAITING' ? 'gray' : 'gray'};
  font-weight: bold;
  padding: 1rem;
`;

const RequestWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.05);
  &:hover {
    cursor: pointer;
    background-color: #afafaf1d;
    transition: all ease-in-out 200ms;
  }
`;

const PaginationWrapper = styled.div`
  margin: 1rem 0;
`