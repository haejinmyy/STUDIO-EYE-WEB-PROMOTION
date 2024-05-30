import { getCompanyDetailData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';

const Detail = () => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyDetailData);
  const detailInformationKeys = data?.detailInformation ? Object.keys(data?.detailInformation) : ['what we do'];
  const detailInformationValues = data?.detailInformation ? Object.values(data?.detailInformation) : ['hello'];
  const combinedArray = detailInformationKeys.map((key, index) => {
    return { key, value: detailInformationValues[index] };
  });

  if (isLoading) return <>is Loading..</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      {data && (
        <ContentBlock>
          {DATAEDIT_TITLES_COMPONENTS.Detail}
          <InputWrapper>
            <div>
              {combinedArray.map((data) => (
                <DetailItem>
                  <div className='detail_title'>{data.key}</div>
                  <div className='detail_content'>{String(data.value)}</div>
                </DetailItem>
              ))}
            </div>
          </InputWrapper>
        </ContentBlock>
      )}
    </Wrapper>
  );
};

export default Detail;

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
