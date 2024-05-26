import React from 'react';
import styled from 'styled-components';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { useQuery } from 'react-query';
import InputForm from './InputForm';
import CompanyInfo from './CompanyInfo';
import { useNavigate } from 'react-router-dom';

const Company = () => {
  const { data, isLoading, error } = useQuery<ICompanyData[], Error>(['client', 'id'], getCompanyData);

  const navigator = useNavigate();
  if (isLoading) return <>is Loading..</>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Wrapper>
      {data === null ? (
        <InputForm />
      ) : (
        <>
          <button onClick={() => navigator('edit')}>수정하기</button>
          <CompanyInfo />
        </>
      )}
    </Wrapper>
  );
};

export default Company;

const Wrapper = styled.div`
  button {
    cursor: pointer;
    position: fixed;
    right: 40px;
    top: 195px;
    background-color: ${(props) => props.theme.color.yellow.bold};
    color: ${(props) => props.theme.color.white.bold};

    width: 140px;
    height: 40px;
    font-size: 15px;
    font-family: ${(props) => props.theme.font.semiBold};

    border: none;
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;

    &:hover {
      scale: 1.1;
      transition: 0.2s;
    }
  }
`;
