import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IsPosted } from '@/assets/images/isPosted.svg';
import { ReactComponent as IsNotPosted } from '@/assets/images/isNotPosted.svg';

type Props = {
  mainImg: string;
  clientName: string;
  name: string;
  isPosted: boolean;
};

const ArtworkBox = ({ mainImg, clientName, name, isPosted }: Props) => {
  return (
    <Container>
      {mainImg ? <img src={mainImg} alt='mainImg' /> : <NoMainImageWrapper>No Image</NoMainImageWrapper>}
      <DescriptionWrapper>
        <div>
          <h2>{clientName}</h2>
          <h1>{name}</h1>
        </div>
        {isPosted ? <IsPosted /> : <IsNotPosted />}
      </DescriptionWrapper>
    </Container>
  );
};

export default ArtworkBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  border-radius: 10px;
  background-color: #dbdbdb14;
  padding: 8px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all ease-in-out 300ms;
  }
  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 5px;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: black;
    margin-top: 3px;
  }
  h2 {
    font-family: 'pretendard-medium';
    font-size: 15px;
    color: #707070;
  }
`;

const DescriptionWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const NoMainImageWrapper = styled.div`
  width: 180px;
  height: 180px;
  font-family: 'pretendard-medium';
  font-size: 15px;
  color: #ffffff;
`;
