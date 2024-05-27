import { getRequestsData } from '@/apis/PromotionAdmin/request';
import { IRequest } from '@/types/PromotionAdmin/request';
import { useQuery } from 'react-query';
import { ContentBox } from '../../../components/PromotionAdmin/Request/Components';
import styled from 'styled-components';
import { useState } from 'react';
import Pagination from '../../../components/PromotionAdmin/FAQ/Pagination';
import { PA_ROUTES } from '@/constants/routerConstants';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalVisible(!modalVisible);
  };

  const closeModal = (e: React.MouseEvent, clientName: string, state: string, requestId: number) => {
    e.stopPropagation();
    let answerText = '';
    if (state === 'APPROVED') {
      answerText = clientName + '님의 문의가 승인되었습니다.';
    } else if (state === 'REJECTED') {
      answerText =
        clientName +
        '님의 문의를 거절하게 되어 죄송합니다. 더 발전된 Studio-EYE가 되어 더욱 많은 문의를 진행할 수 있도록 노력하겠습니다.';
    }
    const formData = {
      answer: answerText,
      state: state,
    };
    if (window.confirm('답변 메일을 보내시겠습니까?')) {
      axios
        .put(`http://3.36.95.109:8080/api/requests/${requestId}/comment`, formData)
        .then((response) => {
          alert('메일 발송이 완료되었습니다.');
          navigator(`${PA_ROUTES.REQUEST}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setModalVisible(!modalVisible);
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
                <Info>문의 총 {data.length}건</Info>
              </Title>
              <ButtonsWrapper>
                <ButtonWrapper>
                  <Button>
                    승인 대기 문의
                    <input
                      type='checkbox'
                      id='waitingApprovalSwitch'
                      checked={showWaitingApproval}
                      onChange={handleWaitingToggle}
                    />
                    <label htmlFor='waitingApprovalSwitch' className='switch_label'>
                      <span className='onf_btn'></span>
                    </label>
                  </Button>
                </ButtonWrapper>
                <ButtonWrapper>
                  <Button>
                    완료된 문의
                    <input
                      type='checkbox'
                      id='completedRequestSwitch'
                      checked={showCompletedRequest}
                      onChange={handleCompletedToggle}
                    />
                    <label htmlFor='completedRequestSwitch' className='switch_label'>
                      <span className='onf_btn'></span>
                    </label>
                  </Button>
                </ButtonWrapper>
              </ButtonsWrapper>
            </TitleWrapper>
            <StyledTable>
              <thead>
                <tr className='colunm_name'>
                  <th>카테고리</th>
                  <th>고객이름</th>
                  <th>소속</th>
                  <th>연락처</th>
                  <th>이메일</th>
                  <th>직책</th>
                  <th>날짜</th>
                  <th>승인상태</th>
                  <th>문의상태</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  (showWaitingApproval === true
                    ? data
                      .filter((request) => request.state === 'WAITING')
                      .slice(indexOfFirst, indexOfLast)
                      .map((request) => (
                        <tr key={request.id} onClick={() => navigator(`${PA_ROUTES.REQUEST}/${request.id}`)}>
                          <td>{request.category}</td>
                          <td>{request.clientName}</td>
                          <td>{request.organization}</td>
                          <td>{request.contact}</td>
                          <td>{request.email}</td>
                          <td>{request.position}</td>
                          <td>
                            {request.year}-{request.month}
                          </td>
                          <td>
                            {modalVisible === false ? (
                              <StateButton requestState={request.state} onClick={openModal}>
                                {request.state === 'WAITING' ? '대기' : request.state === 'REJECTED' ? '거부' : '승인'}
                              </StateButton>
                            ) : (
                              <>
                                <SelectButton
                                  onClick={(e) => {
                                    closeModal(e, request.clientName, 'APPROVED', request.id);
                                  }}
                                >
                                  승인
                                </SelectButton>
                                <SelectButton
                                  onClick={(e) => {
                                    closeModal(e, request.clientName, 'REJECTED', request.id);
                                  }}
                                >
                                  거부
                                </SelectButton>
                              </>
                            )}
                          </td>
                          <td>{request.state === 'APPROVED' || request.state === 'WAITING' ? '답변완료' : '대기'}</td>
                        </tr>
                      ))
                    : showCompletedRequest === true
                      ? data
                        .filter((request) => request.state === 'WAITING' || request.state === 'WAITING')
                        .slice(indexOfFirst, indexOfLast)
                        .map((request) => (
                          <tr key={request.id} onClick={() => navigator(`${PA_ROUTES.REQUEST}/${request.id}`)}>
                            <td>{request.category}</td>
                            <td>{request.clientName}</td>
                            <td>{request.organization}</td>
                            <td>{request.contact}</td>
                            <td>{request.email}</td>
                            <td>{request.position}</td>
                            <td>
                              {request.year}-{request.month}
                            </td>
                            <td>
                              {modalVisible === false ? (
                                <StateButton requestState={request.state} onClick={openModal}>
                                  {request.state ==='WAITING' ? '대기' : request.state === 'REJECTED' ? '거부' : '승인'}
                                </StateButton>
                              ) : (
                                <>
                                  <SelectButton
                                    onClick={(e) => {
                                      closeModal(e, request.clientName, 'APPROVED', request.id);
                                    }}
                                  >
                                    승인
                                  </SelectButton>
                                  <SelectButton
                                    onClick={(e) => {
                                      closeModal(e, request.clientName, 'REJECTED', request.id);
                                    }}
                                  >
                                    거부
                                  </SelectButton>
                                </>
                              )}
                            </td>
                            <td>{request.state ==='APPROVED' || request.state === 'WAITING' ? '답변완료' : '대기'}</td>
                          </tr>
                        ))
                      : data
                        .filter((request) => request.state === 'WAITING' || request.state === 'WAITING')
                        .slice(indexOfFirst, indexOfLast)
                        .map((request) => (
                          <tr key={request.id} onClick={() => navigator(`${PA_ROUTES.REQUEST}/${request.id}`)}>
                            <td>{request.category}</td>
                            <td>{request.clientName}</td>
                            <td>{request.organization}</td>
                            <td>{request.contact}</td>
                            <td>{request.email}</td>
                            <td>{request.position}</td>
                            <td>
                              {request.year}-{request.month}
                            </td>
                            <td>
                              {modalVisible === false ? (
                                <StateButton requestState={request.state} onClick={openModal}>
                                  {request.state === 'WAITING' ? '대기' : request.state === 'REJECTED' ? '거부' : '승인'}
                                </StateButton>
                              ) : (
                                <>
                                  <SelectButton
                                    onClick={(e) => {
                                      closeModal(e, request.clientName, 'APPROVED', request.id);
                                    }}
                                  >
                                    승인
                                  </SelectButton>
                                  <SelectButton
                                    onClick={(e) => {
                                      closeModal(e, request.clientName, 'REJECTED', request.id);
                                    }}
                                  >
                                    거부
                                  </SelectButton>
                                </>
                              )}
                            </td>
                            <td>{request.state === 'APPROVED' || request.state === 'WAITING' ? '답변완료' : '대기'}</td>
                          </tr>
                        )))}
              </tbody>
            </StyledTable>
            <PaginationWrapper>
              <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={setCurrentPage} />
            </PaginationWrapper>
          </>
        )}
      </ContentBox>
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
    width: 200px;
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

const ButtonsWrapper = styled.div`
  display: flex;
  width: 310px;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.color.black.bold};
  cursor: pointer;
  display: flex;
  background-color: ${(props) => props.theme.color.white.bold};
  border-radius: 5px;
  align-items: center;
  height: 30px;
  min-width: 90px;
  border: 0.5px solid ${(props) => props.theme.color.black.light};
  padding: 5px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  #waitingApprovalSwitch {
    position: absolute;
    /* hidden */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  #completedRequestSwitch {
    position: absolute;
    /* hidden */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .switch_label {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 35px;
    height: 14px;
    background: #fff;
    border: 1px solid ${(props) => props.theme.color.yellow.bold};
    border-radius: 20px;
    transition: 0.2s;
    margin-left: 5px;
  }

  .onf_btn {
    position: absolute;
    top: 2px;
    left: 2px;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: ${(props) => props.theme.color.yellow.bold};
    transition: 0.2s;
  }

  /* checking style */
  #waitingApprovalSwitch:checked + .switch_label {
    background: ${(props) => props.theme.color.yellow.bold};
    border: 1px solid ${(props) => props.theme.color.yellow.bold};
  }

  #waitingApprovalSwitch:checked + .switch_label:hover {
    background: ${(props) => props.theme.color.yellow.bold};
  }
  #completedRequestSwitch:checked + .switch_label {
    background: ${(props) => props.theme.color.yellow.bold};
    border: 1px solid ${(props) => props.theme.color.yellow.bold};
  }

  #completedRequestSwitch:checked + .switch_label:hover {
    background: ${(props) => props.theme.color.yellow.bold};
  }

  /* move */
  #waitingApprovalSwitch:checked + .switch_label .onf_btn {
    left: 21px;
    background: #fff;
    box-shadow: 1px 2px 3px #00000020;
  }
  #completedRequestSwitch:checked + .switch_label .onf_btn {
    left: 21px;
    background: #fff;
    box-shadow: 1px 2px 3px #00000020;
  }
`;

const PaginationWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
`;

const StateButton = styled.button<{ requestState: string }>`
  padding: 5px 10px;
  border: 1px solid #c8c9cc;
  border-radius: 20px;
  cursor: pointer;
  background: ${({ requestState }) => {
    if (requestState === 'WAITING') {
      return 'transparent';
    } else if (requestState === 'REJECTED') {
      return 'red';
    } else {
      return 'green';
    }
  }};
  color: ${({ requestState }) => {
    if (requestState === 'WAITING') {
      return 'black';
    } else {
      return 'white';
    }
  }};
  transition: background-color 0.3s;
  &:hover {
    background-color: #ddd;
  }
`;

const SelectButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #c8c9cc;
  border-radius: 20px;
  cursor: pointer;
  background: transparent;
  color: black;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ddd;
  }
`;