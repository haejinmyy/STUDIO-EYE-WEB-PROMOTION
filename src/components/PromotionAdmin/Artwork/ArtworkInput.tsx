import React from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditMode: boolean;
  isFile: boolean;
  mainFile?: string;
};

const ArtworkInput = ({ label, name, value, onChange, isEditMode, isFile, mainFile }: Props) => {
  return (
    <Container>
      {isFile ? (
        <>
          <LabelWrapper>{label}</LabelWrapper>
          <FileDes>Main Img는 최대 한 개만 지정이 가능합니다.</FileDes>
          {isEditMode ? (
            <>
              <input type='file' accept='image/*' name={name} value={value} onChange={onChange} />
              <MainImg src={mainFile} alt='mainFile' />
            </>
          ) : (
            <MainImg src={mainFile} alt='mainFile' />
          )}
        </>
      ) : (
        <TextInputWrapper>
          <TextInputLabelWrapper>{label}</TextInputLabelWrapper>{' '}
          {isEditMode ? <input name={name} value={value} onChange={onChange} /> : <DetailWrapper>{name}</DetailWrapper>}
        </TextInputWrapper>
      )}
    </Container>
  );
};

export default ArtworkInput;

const Container = styled.div`
  input {
    background: inherit;
    border-style: none;
    background-color: #ffffff36;

    border-radius: 5px;
    width: 90%;
    height: 30px;
    &:hover {
    }
    &:focus {
      outline: none;
    }
  }
`;
const LabelWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 18px;
  margin-bottom: 15px;
`;

const MainImg = styled.img`
  width: 100%;
  height: 280px;
  object-fit: contain;
`;

const FileDes = styled.div`
  font-family: 'pretendard-light';
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 15px;
`;

const TextInputWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  height: 40px;
  align-items: center;
`;
const TextInputLabelWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 18px;
  width: 100px;
  background-color: red;
`;

const DetailWrapper = styled.div`
  font-family: 'pretendard-regular';
  height: fit-content;
`;
