import { getRequestsData } from '@/apis/PromotionAdmin/request';
import { IRequestData } from '@/types/PromotionAdmin/request';
import { useQuery } from 'react-query';
import { ContentBox } from '../../../components/PromotionAdmin/Request/Components';
import styled from 'styled-components';
import { useState } from 'react';
import Pagination from '../../../components/PromotionAdmin/FAQ/Pagination';
import { PA_ROUTES } from '@/constants/routerConstants';
import { Outlet, useNavigate } from 'react-router-dom';

function RequestList() {
  const { data, isLoading } = useQuery<IRequestData>(['request', 'id'], getRequestsData);
  const navigator = useNavigate();
  //   data && data.data.map((request) => request.fileUrlList.map((url) => console.log(url)));

  // pagination 구현에 사용되는 변수
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  return (
    <Wrapper>
      <ContentBox>
        <TitleWrapper>
          <Title>
            <Icon>
              <svg width='20' height='20' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11.7692 1H4.07692C3.66889 1 3.27758 1.16209 2.98906 1.4506C2.70055 1.73912 2.53846 2.13043 2.53846 2.53846V16.3846L1 21L7.15385 19.4615H19.4615C19.8695 19.4615 20.2609 19.2994 20.5494 19.0109C20.8378 18.7225 21 18.3311 21 17.9231V10.2308'
                  stroke='#FFA900'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M13.0973 12.7486L8.48193 13.5793L9.25116 8.9024L16.5281 1.65625C16.6711 1.51205 16.8412 1.39759 17.0288 1.31949C17.2161 1.24138 17.4172 1.20117 17.6205 1.20117C17.8235 1.20117 18.0246 1.24138 18.212 1.31949C18.3995 1.39759 18.5697 1.51205 18.7128 1.65625L20.3435 3.28701C20.4877 3.43003 20.6021 3.6002 20.6803 3.78767C20.7583 3.97514 20.7986 4.17623 20.7986 4.37932C20.7986 4.58241 20.7583 4.7835 20.6803 4.97098C20.6021 5.15846 20.4877 5.32861 20.3435 5.47163L13.0973 12.7486Z'
                  stroke='#FFA900'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Icon>
            Request 관리
            <Info>의뢰 총 {data?.data.length}건</Info>
          </Title>
        </TitleWrapper>
        <StyledTable>
          <thead>
            <tr className='colunm_name'>
              <th>카테고리</th>
              <th>고객이름</th>
              <th>소속</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>지위</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.slice(indexOfFirst, indexOfLast).map((request) => (
                <tr key={request.id} onClick={() => navigator(`${PA_ROUTES.REQUEST}/${request.id}`)}>
                  <td>{request.category}</td>
                  <td>{request.clientName}</td>
                  <td>{request.organization}</td>
                  <td>{request.contact}</td>
                  <td>{request.email}</td>
                  <td>{request.position}</td>
                </tr>
              ))}
          </tbody>
        </StyledTable>
        {data && (
          <PaginationWrapper>
            <Pagination postsPerPage={postsPerPage} totalPosts={data?.data.length} paginate={setCurrentPage} />
          </PaginationWrapper>
        )}
      </ContentBox>
      <Outlet />
    </Wrapper>
  );
}

export default RequestList;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0fr);
  grid-gap: 15px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  font-size: 13px;

  .colunm_name {
    padding: 10px;
    font-weight: 800;
  }

  td {
    padding: 15px;
    text-align: center;
  }

  th:last-child {
    display: flex;
  }

  tbody tr {
    cursor: pointer;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
  padding: 0px 20px;
`;

const Icon = styled.div`
  padding-right: 0.8rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const Info = styled.div`
  height: 20px;
  display: flex;
  align-items: end;
  padding-left: 8px;
  font-size: 10px;
  color: gray;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
`;
