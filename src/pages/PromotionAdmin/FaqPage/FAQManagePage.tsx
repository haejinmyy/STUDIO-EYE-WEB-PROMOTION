import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getFAQPaginateData } from '../../../apis/PromotionAdmin/faq';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PA_ROUTES } from '@/constants/routerConstants';
import { theme } from '@/styles/theme';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import Pagination from '@/components/Pagination/Pagination';
import { IFAQPaginationData } from '@/types/PromotionAdmin/faq';
import { ContentBox } from '@/components/PromotionAdmin/FAQ/Components';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/images/PA/delete.svg';

function FAQManagePage() {
  const navigator = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const size = 10;
  const { data, isLoading, refetch, error } = useQuery<IFAQPaginationData, Error>(['faq', currentPage, size], () =>
    getFAQPaginateData(currentPage, size),
  );
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState<null | number>(null);

  const [deleteItems, setDeleteItems] = useState<number[]>([]);

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(`${PROMOTION_BASIC_PATH}/api/faq`, { data: deleteItems })
        .then((response) => {
          alert('FAQ가 삭제되었습니다.');
          refetch();
        })
        .catch((error) => {
          console.log(error);
          alert('FAQ 삭제 중 오류가 발생했습니다.');
        });
    }
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
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
            <Info>등록된 게시글 {data?.totalElements}건 </Info>
          </Title>
          <ButtonsWrapper>
            {editMode && (
              <ButtonWrapper>
                <Button onClick={handleDelete}>
                  <div>
                    <DeleteIcon />
                  </div>
                  Delete
                </Button>
              </ButtonWrapper>
            )}
            <ButtonWrapper>
              <Button
                onClick={() => {
                  navigator(`${PA_ROUTES.FAQ}/write`);
                }}
              >
                <div>
                  <AddedIcon />
                </div>
                Add New FAQ
              </Button>
            </ButtonWrapper>

            <ButtonWrapper>
              <Button>
                Edit
                <div>
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
                </div>
              </Button>
            </ButtonWrapper>
          </ButtonsWrapper>
        </TitleWrapper>

        <ListWrapper>
          {data &&
            data.content.length > 0 &&
            data.content.map((faq) => (
              <ListItemWrapper
                key={faq.id}
                onClick={() => {
                  navigator(`${PA_ROUTES.FAQ}/${faq.id}?page=${currentPage + 1}`);
                  setId(faq.id);
                }}
                selected={faq.id === id ? true : false}
              >
                {editMode && (
                  <input
                    type='checkbox'
                    onClick={() => {
                      setDeleteItems((prev) => [...prev, faq.id]);
                    }}
                  />
                )}
                <QuestionTitleWrapper layoutId={faq.id + ''} key={faq.id}>
                  <QuestionTitle>
                    <QAIcon>Q</QAIcon>
                    {faq.question}
                  </QuestionTitle>
                  <VisibilityWrapper>{faq.visibility ? '공개' : '비공개'}</VisibilityWrapper>
                </QuestionTitleWrapper>
              </ListItemWrapper>
            ))}
        </ListWrapper>

        {data && (
          <PaginationWrapper>
            <Pagination postsPerPage={data.size} totalPosts={data.totalElements} paginate={setCurrentPage} />
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
  justify-content: center;
  align-items: end;
  display: flex;
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

const ListWrapper = styled.div`
  height: 60vh;
`;

const ListItemWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  background-color: ${({ selected }) => (selected ? theme.color.yellow.light : 'none')};
`;

const DeleteButton = styled.button`
  border: none;
  box-shadow: 1px 2px 3px #00000020;
  background-color: ${(props) => props.theme.color.white.light};
`;
