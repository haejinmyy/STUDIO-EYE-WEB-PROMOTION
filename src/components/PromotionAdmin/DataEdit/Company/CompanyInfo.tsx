import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const CompanyInfo = () => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['client', 'id'], getCompanyData);

  if (isLoading) return <>is Loading...</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      {data && (
        <Wrapper>
          <ContentBlock>
            <Title>Basic</Title>
            <InfoWrapper>
              <p>Address</p>
              <span>{data.address}</span>
              <p>Phone Number</p>
              <span>{data.phone}</span>
              <p>Fax Number</p>
              <span>{data.fax}</span>
            </InfoWrapper>
          </ContentBlock>

          <ContentBlock>
            <Title>Introduction</Title>
            <InfoWrapper>
              <p>Main Overview</p>
              <span dangerouslySetInnerHTML={{ __html: data.mainOverview }} />
              <p>Commitment</p>
              <span>{data.commitment}</span>
              <p>Introduction</p>
              <span>{data.introduction}</span>
            </InfoWrapper>
          </ContentBlock>

          <ContentBlock>
            <Title>Detail</Title>
            <InfoWrapper>
              {data.detailInformation && (
                <>
                  <p>1</p>
                  <span>{data.detailInformation.additionalProp1}</span>
                  <p>2</p>
                  <span>{data.detailInformation.additionalProp2}</span>

                  <p>3</p>
                  <span>{data.detailInformation.additionalProp3}</span>
                </>
              )}
            </InfoWrapper>
          </ContentBlock>

          <ContentBlock>
            <Title>Logo & Slogan</Title>
            <InfoWrapper>
              <LogoWrapper>
                <img src={data.logoImageUrl} />
                <img src={data.sloganImageUrl} />
              </LogoWrapper>
            </InfoWrapper>
          </ContentBlock>
        </Wrapper>
      )}
    </>
  );
};

export default CompanyInfo;

const Wrapper = styled.div`
  width: 800px;
`;
const ContentBlock = styled.div`
  display: flex;
  padding: 25px 10px;
  border-bottom: 2px solid ${(props) => props.theme.color.black.pale};
`;
const Title = styled.div`
  font-size: 22px;
  font-family: 'pretendard-medium';
  width: 300px;
`;
const InfoWrapper = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  font-family: 'pretendard-light';
  p {
    font-size: 18px;
    font-weight: 900;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  span {
    padding-bottom: 7px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  div {
    cursor: pointer;
    border: none;
    background-color: ${(props) => props.theme.color.white.bold};
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
    padding: 0.4rem 1.4rem;
    border-radius: 0.2rem;
    transition: 0.2s;
    width: 130px;
    display: flex;
    justify-content: center;
    font-weight: 700;
    margin-right: 20px;

    &:hover {
      background-color: ${(props) => props.theme.color.yellow.light};
    }
  }

  input {
    display: none;
  }

  img {
    width: 200px;
    margin-bottom: 10px;
  }
`;
