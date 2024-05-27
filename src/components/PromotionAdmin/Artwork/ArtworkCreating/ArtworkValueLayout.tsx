import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  description: string;
  content: React.ReactNode;
};

const ArtworkValueLayout = ({ title, description, content }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
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
  width: 280px;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;
const Title = styled.div`
  font-family: 'pretendard-bold';
  font-size: 18px;
  margin-bottom: 10px;
  color: #282828;
`;
const Description = styled.div`
  font-family: 'pretendard-regular';
  width: 100%;
  font-size: 14px;
  color: #595959;
  margin-bottom: 10px;
`;
const Content = styled.div`
  input {
    width: fit-content;
    height: 30px;
    padding: 8px;
    font-family: 'pretendard-medium';
    outline-style: none;
    border-radius: 5px;
    font-size: 15px;
    border: none;
    background-color: #e9e9e9;
    color: black;
    margin-bottom: 20px;
    &:hover {
      cursor: pointer;
      background-color: #ffffff73;
      transition: all 300ms ease-in-out;
    }
    &:focus {
      background-color: white;
      transition: all 300ms ease-in-out;
    }
    ::placeholder {
      color: #7a7a7a;
    }
  }
`;

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
