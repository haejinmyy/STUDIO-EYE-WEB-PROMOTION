import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { IGetFAQData, getFAQData } from '../../../apis/PromotionAdmin/faq';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ContentBox } from '@/Components/PromotionAdmin/FAQ/Components';
import { PA_ROUTES } from '@/constants/routerConstants';
import { theme } from '@/styles/theme';
import Pagination from '@/Components/PromotionAdmin/FAQ/Pagination';

function FAQManagePage() {
  const navigator = useNavigate();
  const { data, isLoading, refetch } = useQuery<IGetFAQData>(['faq', 'id'], getFAQData);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState<null | number>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`http://3.35.54.100:8080/api/faq/${id}`)
        .then((response) => {})
        .catch((error) => console.log(error));
      alert('FAQ가 삭제되었습니다.');
      refetch();
    } else {
      alert('취소합니다.');
    }
  };

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
            FAQ 게시글 관리
            <Info>등록 게시글 {data?.data.length}건</Info>
          </Title>
          <ButtonsWrapper>
            <ButtonWrapper>
              <Button
                onClick={() => {
                  navigator(`${PA_ROUTES.FAQ}/write`);
                }}
              >
                <div>
                  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0_2_61)'>
                      <path
                        d='M7.11328 4.10742V10.1074'
                        stroke='black'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M4.11328 7.10742H10.1133'
                        stroke='black'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M10.6133 0.607422H3.61328C1.95643 0.607422 0.613281 1.95057 0.613281 3.60742V10.6074C0.613281 12.2643 1.95643 13.6074 3.61328 13.6074H10.6133C12.2702 13.6074 13.6133 12.2643 13.6133 10.6074V3.60742C13.6133 1.95057 12.2702 0.607422 10.6133 0.607422Z'
                        stroke='black'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_2_61'>
                        <rect width='14' height='14' fill='white' transform='translate(0.113281 0.107422)' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                FAQ 등록
              </Button>
            </ButtonWrapper>

            <ButtonWrapper>
              <Button>
                <div>
                  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M1.5 2C1.23478 2 0.98043 2.10536 0.792893 2.29289C0.605357 2.48043 0.5 2.73478 0.5 3V12.5C0.5 12.7652 0.605357 13.0196 0.792893 13.2071C0.98043 13.3946 1.23478 13.5 1.5 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3946 13.0196 13.5 12.7652 13.5 12.5V3C13.5 2.73478 13.3946 2.48043 13.2071 2.29289C13.0196 2.10536 12.7652 2 12.5 2H10.5'
                      stroke='black'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path d='M3.5 0.5V3.5' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M10.5 0.5V3.5' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M3.5 2H8.5' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                    <path
                      d='M10 6.86404L5.86842 10.9956L4 11.25L4.26316 9.38158L8.38596 5.25L10 6.86404Z'
                      stroke='black'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                Edit
                <input
                  type='checkbox'
                  id='switch'
                  onClick={() => {
                    setEditMode((prev) => !prev);
                  }}
                />
                <label htmlFor='switch' className='switch_label'>
                  <span className='onf_btn'></span>
                </label>
              </Button>
            </ButtonWrapper>
          </ButtonsWrapper>
        </TitleWrapper>
        {isLoading ? (
          <>is Loading...</>
        ) : (
          <>
            {data &&
              data?.data.slice(indexOfFirst, indexOfLast).map((faq) => (
                <ListWrapper
                  key={faq.id}
                  onClick={() => {
                    !editMode && navigator(`${PA_ROUTES.FAQ}/${faq.id}`);
                    setId(faq.id);
                  }}
                  selected={faq.id === id ? true : false}
                >
                  {editMode && (
                    <DeleteButton
                      onClick={() => {
                        handleDelete(faq.id);
                      }}
                    >
                      <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M1 3.5H13' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                        <path
                          d='M2.5 3.5H11.5V12.5C11.5 12.7652 11.3946 13.0196 11.2071 13.2071C11.0196 13.3946 10.7652 13.5 10.5 13.5H3.5C3.23478 13.5 2.98043 13.3946 2.79289 13.2071C2.60536 13.0196 2.5 12.7652 2.5 12.5V3.5Z'
                          stroke='black'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M4.5 3.5V3C4.5 2.33696 4.76339 1.70107 5.23223 1.23223C5.70107 0.763392 6.33696 0.5 7 0.5C7.66304 0.5 8.29893 0.763392 8.76777 1.23223C9.23661 1.70107 9.5 2.33696 9.5 3V3.5'
                          stroke='black'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path d='M5.5 6.50098V10.5025' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                        <path d='M8.5 6.50098V10.5025' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    </DeleteButton>
                  )}
                  <QuestionTitleWrapper layoutId={faq.id + ''} key={faq.id}>
                    <QuestionTitle>
                      <QAIcon>Q</QAIcon>
                      {faq.question}
                    </QuestionTitle>
                    <VisibilityWrapper>{faq.visibility ? '공개' : '비공개'}</VisibilityWrapper>
                  </QuestionTitleWrapper>
                </ListWrapper>
              ))}
          </>
        )}
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

export default FAQManagePage;

const VisibilityWrapper = styled.div`
  font-size: 12px;
  padding-right: 15px;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0fr);
  grid-gap: 15px;
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

const QAIcon = styled.div`
  background-color: ${(props) => props.theme.color.yellow.light};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const QuestionTitleWrapper = styled(motion.div)`
  cursor: pointer;
  margin-left: 1rem;
  height: 3rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const QuestionTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 200px;
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
  padding: 1px;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  #switch {
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
  #switch:checked + .switch_label {
    background: ${(props) => props.theme.color.yellow.bold};
    border: 1px solid ${(props) => props.theme.color.yellow.bold};
  }

  #switch:checked + .switch_label:hover {
    background: ${(props) => props.theme.color.yellow.bold};
  }

  /* move */
  #switch:checked + .switch_label .onf_btn {
    left: 21px;
    background: #fff;
    box-shadow: 1px 2px 3px #00000020;
  }
`;

const ListWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;

  /* &:hover {
    color: ${(props) => props.theme.color.yellow.bold};
    font-weight: 900;
    transition: all 0.2s ease-out;
  } */
  background-color: ${({ selected }) => (selected ? theme.color.yellow.light : 'none')};
`;

const DeleteButton = styled.button`
  border: none;
  box-shadow: 1px 2px 3px #00000020;
  background-color: ${(props) => props.theme.color.white.light};
`;
