import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import HoverInfo from './HoverInfo';

export const COMPANY_COLUMNS = {
  Basic: {
    title: 'Basic',
    description: 'Contact 화면과 Footer에 반영됩니다.',
  },
  Logo: {
    title: 'Logo',
    description: 'Header, Footer에 반영됩니다.',
  },
  Slogan: {
    title: 'Slogan',
    description: 'About 화면에 반영됩니다.',
  },
  Detail: {
    title: 'Detail',
    description: 'About 화면에 반영됩니다.',
  },

  Introduction: {
    title: 'Introduction',
    description:
      'Main Overview: Main 화면에 반영됩니다. \n Commitment: Main 화면에 반영됩니다. \n Introduction: About 화면 반영됩니다. ',
  },
};

const CompanyInfo = () => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['client', 'id'], getCompanyData);
  const detailInformationKeys = data?.detailInformation ? Object.keys(data?.detailInformation) : ['what we do'];
  const detailInformationValues = data?.detailInformation ? Object.values(data?.detailInformation) : ['hello'];
  const combinedArray = detailInformationKeys.map((key, index) => {
    return { key, value: detailInformationValues[index] };
  });

  if (isLoading) return <>is Loading...</>;
  if (error) return <>{error.message}</>;
  return (
    <>
      <Wrapper>
        {data && (
          <>
            <div>
              {/* Basic */}
              <ContentBlock>
                <HoverInfo title={COMPANY_COLUMNS.Basic.title} description={COMPANY_COLUMNS.Basic.description} />
                <InputWrapper>
                  <InputTitle>
                    <p>Address</p>
                  </InputTitle>
                  <Content>{data.address}</Content>

                  <InputTitle>
                    <p>Phone Number</p>
                  </InputTitle>

                  <Content>{data.phone}</Content>

                  <InputTitle>
                    <p>Fax Number</p>
                  </InputTitle>

                  <Content>{data.fax}</Content>
                </InputWrapper>
              </ContentBlock>

              {/* Logo & Slogan */}
              <ContentBlock>
                <InputImgWrapper>
                  <Box>
                    <HoverInfo title={COMPANY_COLUMNS.Logo.title} description={COMPANY_COLUMNS.Logo.description} />
                    <LogoWrapper>
                      <ImgBox>
                        <img src={data.logoImageUrl} />
                      </ImgBox>
                    </LogoWrapper>
                  </Box>
                  <Box>
                    <HoverInfo title={COMPANY_COLUMNS.Slogan.title} description={COMPANY_COLUMNS.Slogan.description} />

                    <LogoWrapper>
                      <ImgBox>
                        <img src={data.sloganImageUrl} />
                      </ImgBox>
                    </LogoWrapper>
                  </Box>
                </InputImgWrapper>
              </ContentBlock>
            </div>

            <div>
              {/* Introduntion */}
              <ContentBlock>
                <HoverInfo
                  title={COMPANY_COLUMNS.Introduction.title}
                  description={COMPANY_COLUMNS.Introduction.description}
                />

                <InputWrapper>
                  <InputTitle>Main Overview</InputTitle>
                  <Content dangerouslySetInnerHTML={{ __html: data.mainOverview }} />
                  <InputTitle>Commitment</InputTitle>
                  <Content dangerouslySetInnerHTML={{ __html: data.commitment }} />
                  <InputTitle>Introduction</InputTitle>
                  <Content dangerouslySetInnerHTML={{ __html: data.introduction }} />
                </InputWrapper>
              </ContentBlock>

              {/* Detail */}
              <ContentBlock>
                <TitleWrapper>
                  <HoverInfo title={COMPANY_COLUMNS.Detail.title} description={COMPANY_COLUMNS.Detail.description} />
                </TitleWrapper>
                <InputWrapper>
                  <div>
                    {combinedArray.map((data) => (
                      <DetailItem>
                        <div className='detail_title'>{data.key}</div>
                        <div className='detail_content'>
                          <>{data.value}</>
                        </div>
                      </DetailItem>
                    ))}
                  </div>
                </InputWrapper>
              </ContentBlock>
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default CompanyInfo;

const Wrapper = styled.div`
  display: flex;

  input,
  textarea {
    outline: none;
  }

  input:focus,
  textarea:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

const ContentBlock = styled.div`
  padding: 25px;
  background-color: ${(props) => props.theme.color.white.light};
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
  margin-bottom: 30px;
  margin-right: 30px;
  width: 700px;
  border-radius: 4px;
  height: fit-content;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;

  flex-direction: column;
  font-family: ${(props) => props.theme.font.regular};
  p {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 3px;
  }
  input {
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding-left: 10px;
    height: 30px;
    border: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const InputImgWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputTitle = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  height: 40px;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;

const Box = styled.div``;

const ImgBox = styled.div`
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.background};
  border-radius: 5px;
  margin-top: 15px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  input {
    display: none;
  }

  img {
    max-width: 300px;
    max-height: 150px;
    margin-bottom: 10px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-around;
  padding: 5px 0px;
  font-size: 13px;

  .detail_content {
    display: flex;
    align-items: center;
    padding: 5px;
    font-family: ${(props) => props.theme.font.regular};
    max-height: 130px;
    min-height: 30px;
    width: 400px;
    border: none;
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
    line-height: 18px;
  }

  .detail_title {
    padding: 5px;
    display: flex;
    align-items: center;
    width: 240px;
    height: 30px;
    margin-right: 5px;
    font-family: ${(props) => props.theme.font.regular};
    box-shadow: 1px 1px 4px 0.1px #c6c6c6;
  }
`;

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
