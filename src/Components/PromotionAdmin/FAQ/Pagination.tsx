import { theme } from '@/styles/theme';
import React, { useState } from 'react';
import styled from 'styled-components';

interface IPaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ postsPerPage, totalPosts, paginate }: IPaginationProps) => {
  const [index, setIndex] = useState<null | number>(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Wrapper>
      {pageNumbers.map((number) => (
        <PageLi
          key={number}
          className='page-item'
          onClick={() => {
            paginate(number);
            setIndex(number);
          }}
          selected={number === index ? true : false}
        >
          {number}
        </PageLi>
      ))}
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PageLi = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 25px;
  height: 25px;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.color.white.light};
    background-color: ${(props) => props.theme.color.yellow.bold};
  }
  background-color: ${({ selected }) => (selected ? theme.color.yellow.light : 'none')};
`;
