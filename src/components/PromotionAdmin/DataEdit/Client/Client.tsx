import { getClientData } from '@/apis/PromotionAdmin/dataEdit';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IClientData } from '@/types/PromotionAdmin/dataEdit';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as AddedIcon } from '@/assets/images/PA/added.svg';

const Client = () => {
  const { data, isLoading, error } = useQuery<IClientData[], Error>(['client', 'id'], getClientData);
  const navigator = useNavigate();

  if (isLoading) return <>is Loading..</>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <Wrapper>
        <ButtonWrapper>
          <Button
            onClick={() => {
              navigator(`write`);
            }}
          >
            <AddedIcon width={13} height={13} />
            Client 등록
          </Button>
        </ButtonWrapper>
        <StyledTable>
          <thead>
            <tr className='colunm_name'>
              <th>이름</th>
              <th>로고</th>
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 || data === null || data === undefined ? (
              <NoDataWrapper>😊 클라이언트 데이터가 존재하지 않습니다.</NoDataWrapper>
            ) : (
              <>
                {Array.isArray(data) &&
                  data?.map((client) => (
                    <tr
                      onClick={() =>
                        navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}/${client.clientInfo.id}`)
                      }
                    >
                      <td>{client.clientInfo.name}</td>
                      <td>
                        <LogoImg src={client.logoImg} />
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </StyledTable>
      </Wrapper>
    </>
  );
};

export default Client;

const Wrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 110px;
  height: 30px;
  align-items: center;
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  border-radius: 0.2rem;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light}; /* 버튼 호버 시 색상 조정 */
  }
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 17px;
`;

const LogoImg = styled.img`
  height: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  font-size: 13px;

  .colunm_name {
    font-weight: 800;
  }

  td {
    padding: 15px;
    text-align: center;
    align-items: center;
    width: 200px;
    background-color: ${(props) => props.theme.color.black.light};
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
