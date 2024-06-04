import React from 'react';
import styled from 'styled-components';

type Props = {
  valueTitle: string;
  description: string;
  content: React.ReactNode;
};

const ArtworkValueLayout = ({ valueTitle, description, content }: Props) => {
  return (
    <Container>
      <Title>{valueTitle}</Title>
      <Description>{description}</Description>
      <ContentWrapper>
        <Content>{content}</Content>
      </ContentWrapper>
    </Container>
  );
};

export default ArtworkValueLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
  width: 330px;
  white-space: pre-line;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;
const Title = styled.div`
  font-family: 'pretendard-bold';
  font-size: 17px;
  margin-bottom: 10px;
  color: #282828;
`;
const Description = styled.div`
  font-family: 'pretendard-regular';
  width: 100%;
  font-size: 13px;
  color: #595959;
  margin-bottom: 10px;
  line-height: 120%;
`;
const Content = styled.div``;

const TextInputWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  height: fit-content;
  align-items: center;

  textarea {
    font-family: 'pretendard-regular';
    font-size: 18px;
    height: fit-content;
    background: inherit;
    border-radius: 5px;
    border-style: none;
    background-color: #f7f7f7f2;
    resize: none; /* 크기 조절 비활성화 */
    display: flex;
    align-items: center;
    width: 90%;
    padding: 10px;
    overflow-y: hidden;
    &:hover {
      background-color: #7e7e7e2c;
      transition: all 300ms ease-in-out;
    }
    &:focus {
      outline: none;
    }
  }
`;
