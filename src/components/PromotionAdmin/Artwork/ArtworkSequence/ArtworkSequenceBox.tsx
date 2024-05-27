import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IsPosted } from '@/assets/images/isPosted.svg';
import { ReactComponent as IsNotPosted } from '@/assets/images/isNotPosted.svg';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';
import { theme } from '@/styles/theme';

const ArtworkSequenceBox = (
    {type,artworkData,}
    :{type:string,
      artworkData:ArtworkData,
      // updateSequence:(projectId:number,oldSequence:number,newSequence:number)=>void
    }) => {

  return (
    <Container>
      <Sequence>{type=="main"?(artworkData.mainSequence===999?"-":artworkData.mainSequence)
      :artworkData.sequence}</Sequence>
      {artworkData.mainImg ? <img src={artworkData.mainImg} alt='mainImg' /> : <NoMainImageWrapper>No Image</NoMainImageWrapper>}
      <DescriptionWrapper>
        <RightAlignWrapper>
            <h2>{artworkData.category}</h2>
            <TypeWrapper projectType={artworkData.projectType}>{artworkData.projectType}</TypeWrapper>
        </RightAlignWrapper>
        <Wrapper>
          <div>
            <h2>{artworkData.client}</h2>
            <h1>{artworkData.name}</h1>
          </div>
        </Wrapper>
      </DescriptionWrapper>
      {/* <EditWrapper>
        {isEditing&&<SequenceInput type='number' placeholder='숫자 입력' onChange={handleSequence}/>}
        <Button onClick={handleEditing}>{isEditing?"완료":"순서 수정"}</Button>
      </EditWrapper> */}
    </Container>
  );
};

export default ArtworkSequenceBox;

const Container = styled.div`
-webkit-user-select: none;
 -moz-user-select: none;
 -ms-use-select: none;
 user-select: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 350px;
  border-radius: 10px;
  background-color: #afafaf13;
  padding: 20 20 20 0px;
  box-sizing: border-box;

  text-overflow: ellipsis;
  white-space:nowrap;
  overflow : hideen;

  &:hover {
    cursor: pointer;
    transition: all ease-in-out 300ms;
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
    transition: 0.3s;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: black;
    margin-top: 3px;
    transition: 0.3s;
  }
  h2 {
    font-family: 'pretendard-medium';
    font-size: 15px;
    color: #707070;
    transition: 0.3s;
  }
  h3 {
    font-family: 'pretendard-medium';
    font-size: 15px;
    color: #4b4b4b;
    line-height: 18px;
    transition: 0.3s;
  }
`;

const Sequence=styled.h2`
  font-size:20px;
  min-width:40px;
  text-align:center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoMainImageWrapper = styled.div`
  width: 180px;
  height: 180px;
  font-family: 'pretendard-medium';
  font-size: 15px;
  color: #ffffff;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  
  margin-left: 15px;
  transition: 1s;
`;
const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-item:top;
  justify-content: flex-end;
  margin-left: 15px;
  transition: 1s;
`;
const RightAlignWrapper = styled.div`
//   text-align: right;
display:flex;
flex-direction: column;
width: 130px;
align-item: center;
`;

const TypeWrapper = styled.div<{ projectType: 'others' | 'top' | 'main' }>`
  width: fit-content;
  height: fit-content;
  padding: 3px 6px;
  border-radius: 10px;
  background-color: ${({ projectType }) =>
    projectType === 'main' ? '#ffaa007d' : projectType === 'top' ? '#d3002384' : '#33333321'};
  font-family: 'pretendard-medium';
  font-size: 13px;
  color: ${({ projectType }) => (projectType === 'main' || projectType === 'top' ? 'white' : 'black')};
`;

const Button=styled.button`
  width: 65px;
  height: 30px;
  text-color:${theme.color.black.light};
  background-color:${theme.color.black.pale};
  border:0;
  border-radius: 10px;
  margin-left:auto;
  margin-right:10px;
  transition: 0.5s;

  &:hover{
    opacity: 0.7;
    transition: 0.2s;
    cursor:pointer;
  }
`;

const SequenceInput=styled.input`
  text-align:center;
  transition:0.3s;
  width:60px;
  height:20px;
  margin: 5px 10px 5px 0;
  border-radius: 10px;
  border: solid 1px ${theme.color.black.bold};

  &::placeholder{
    font-family: 'pretendard-light';
  }
`;