import React from 'react';
import { useQuery } from 'react-query';
import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';

import { Wrapper, ContentBlock, InputWrapper, InputTitle } from '../CompanyFormStyleComponents';
import styled from 'styled-components';
import { DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';

const Introduction = () => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);

  if (isLoading) return <>is Loading...</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {data && (
        <ContentBlock>
          {DATAEDIT_TITLES_COMPONENTS.Introduction}

          <InputWrapper>
            <InputTitle>Main Overview</InputTitle>
            <Content dangerouslySetInnerHTML={{ __html: data.mainOverview }} />
            <InputTitle>Commitment</InputTitle>
            <Content dangerouslySetInnerHTML={{ __html: data.commitment }} />
            <InputTitle>Introduction</InputTitle>
            <Content dangerouslySetInnerHTML={{ __html: data.introduction }} />
          </InputWrapper>
        </ContentBlock>
      )}
    </Wrapper>
  );
};

export default Introduction;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 14px;
  font-family: ${(props) => props.theme.font.regular};
  min-height: 15px;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;

  & p,
  span {
    font-size: 14px;
    font-family: ${(props) => props.theme.font.regular};
    line-height: 20px;
  }
`;
